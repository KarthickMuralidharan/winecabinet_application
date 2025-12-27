import { AuthService } from './authService';
// AI Sommelier Service
// In production, API keys should be stored securely in environment variables
// or fetched from a backend service to keep them private.

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

interface WineDetails {
    name: string;
    type: string;
    vintage: string;
    region?: string;
    country?: string;
    grape?: string;
}

// Fallback lookup table for shelf life when API is unavailable
const SHELF_LIFE_TABLE: Record<string, { min: number; max: number }> = {
    'Red-Bordeaux': { min: 10, max: 25 },
    'Red-Burgundy': { min: 8, max: 20 },
    'Red-Napa Valley': { min: 8, max: 15 },
    'Red-default': { min: 5, max: 10 },
    'White-Burgundy': { min: 5, max: 15 },
    'White-default': { min: 2, max: 5 },
    'Sparkling-Champagne': { min: 3, max: 10 },
    'Sparkling-default': { min: 1, max: 3 },
    'Rose-default': { min: 1, max: 3 },
    'Dessert-default': { min: 10, max: 50 },
};

export const AIService = {
    /**
     * Get shelf life / drinking window prediction
     * Uses OpenAI if available, falls back to lookup table
     */
    getShelfLifeAdvice: async (wineDetails: WineDetails): Promise<{ advice: string; peakWindow?: { start: number; end: number } }> => {
        const user = await AuthService.getCurrentAppUser();
        if (user?.subscriptionTier === 'free') {
            return { advice: 'This is a premium feature. Please upgrade your subscription to get AI-powered shelf life advice.' };
        }
        const { type, vintage, name, region, country, grape } = wineDetails;
        const vintageYear = parseInt(vintage) || new Date().getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - vintageYear;

        // Try OpenAI first
        if (OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY') {
            try {
                const response = await fetch(OPENAI_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{
                            role: 'system',
                            content: 'You are a sommelier expert. Provide concise wine drinking window advice. Respond with JSON: { "advice": "string", "peakStart": year, "peakEnd": year }'
                        }, {
                            role: 'user',
                            content: `Wine: ${name}, Type: ${type}, Vintage: ${vintage}, Region: ${region || 'Unknown'}, Country: ${country || 'Unknown'}, Grape: ${grape || 'Unknown'}. What is the ideal drinking window?`
                        }],
                        max_tokens: 150
                    })
                });

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;
                if (content) {
                    try {
                        const parsed = JSON.parse(content);
                        return {
                            advice: parsed.advice,
                            peakWindow: { start: parsed.peakStart, end: parsed.peakEnd }
                        };
                    } catch {
                        return { advice: content };
                    }
                }
            } catch (e) {
                console.error('[AIService] OpenAI call failed:', e);
            }
        }

        // Fallback: Use lookup table
        const key = `${type}-${region || 'default'}`;
        const fallbackKey = `${type}-default`;
        const window = SHELF_LIFE_TABLE[key] || SHELF_LIFE_TABLE[fallbackKey] || { min: 3, max: 8 };

        const peakStart = vintageYear + window.min;
        const peakEnd = vintageYear + window.max;

        let advice: string;
        if (currentYear < peakStart) {
            advice = `This ${vintage} ${name} is still young. Best drinking window starts around ${peakStart}.`;
        } else if (currentYear > peakEnd) {
            advice = `⚠️ This wine may be past its peak (ended ${peakEnd}). Drink soon if it was stored well.`;
        } else {
            advice = `✅ This ${vintage} ${name} is in its prime! Peak window: ${peakStart}-${peakEnd}.`;
        }

        return { advice, peakWindow: { start: peakStart, end: peakEnd } };
    },

    /**
     * Get food pairing recommendations from user's inventory
     * Uses OpenAI if available, falls back to keyword matching
     */
    getFoodPairing: async (meal: string, availableWines: any[]): Promise<string> => {
        const user = await AuthService.getCurrentAppUser();
        if (user?.subscriptionTier === 'free') {
            return 'This is a premium feature. Please upgrade your subscription to get AI-powered food pairing recommendations.';
        }
        // Try OpenAI first
        if (OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY') {
            try {
                const wineList = availableWines.slice(0, 10).map(w => ({
                    name: w.details.name,
                    type: w.details.type,
                    vintage: w.details.vintage,
                    region: w.details.region
                }));

                const response = await fetch(OPENAI_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{
                            role: 'system',
                            content: 'You are a sommelier. Recommend the best wine pairing from the user\'s inventory. Be concise and enthusiastic.'
                        }, {
                            role: 'user',
                            content: `I'm having ${meal}. Here are wines in my cellar: ${JSON.stringify(wineList)}. Which should I drink and why?`
                        }],
                        max_tokens: 200
                    })
                });

                const data = await response.json();
                return data.choices?.[0]?.message?.content || 'Could not get AI recommendation.';
            } catch (e) {
                console.error('[AIService] OpenAI pairing call failed:', e);
            }
        }

        // Fallback: Basic keyword matching
        const lowerMeal = meal.toLowerCase();

        if (lowerMeal.includes('steak') || lowerMeal.includes('beef') || lowerMeal.includes('lamb')) {
            const match = availableWines.find(w => w.details.type === 'Red');
            if (match) return `🍷 Best pairing: ${match.details.name} (${match.details.vintage}). Red meats love bold tannins!`;
            return 'I recommend a bold Cabernet or Malbec, but you don\'t have one in stock.';
        }

        if (lowerMeal.includes('fish') || lowerMeal.includes('seafood') || lowerMeal.includes('shrimp')) {
            const match = availableWines.find(w => w.details.type === 'White');
            if (match) return `🥂 Try: ${match.details.name}. A crisp white complements seafood beautifully.`;
            return 'A Sauvignon Blanc or Chablis would be perfect here.';
        }

        if (lowerMeal.includes('chicken') || lowerMeal.includes('pork')) {
            const match = availableWines.find(w => ['White', 'Rose'].includes(w.details.type));
            if (match) return `Pair with: ${match.details.name}. Lighter dishes work with both whites and rosés.`;
        }

        if (lowerMeal.includes('cheese') || lowerMeal.includes('dessert')) {
            const match = availableWines.find(w => w.details.type === 'Dessert' || w.details.type === 'Sparkling');
            if (match) return `🍾 Special occasion! Try: ${match.details.name}.`;
        }

        return `For "${meal}", I'd need to analyze your specific inventory more. Consider a versatile Pinot Noir or Chardonnay.`;
    }
};
