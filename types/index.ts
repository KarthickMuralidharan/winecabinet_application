export interface AppUser {
    uid: string;
    email: string | null;
    displayName?: string | null;
    subscriptionTier?: 'free' | 'premium' | 'professional';
}

export interface UserProfile {
    email: string;
    displayName: string;
    subscriptionTier: 'free' | 'premium' | 'professional';
    createdAt: string;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    twoFactorVerified?: boolean;
    allowedCountries: string[];
    deviceFingerprints?: string[];
    authProvider?: string;
}

export interface Cabinet {
    id: string;
    ownerId: string;
    name: string;
    type: 'cabinet' | 'room' | 'rack';
    parentId?: string; // For racks inside rooms
    dimensions: {
        rows: number;
        columns: number;
        depth: number;
    };
    roomLayout?: { // Position in room view (for racks)
        x: number;
        y: number;
        width: number;
        height: number;
    };
    zone?: {
        name: string; // e.g., "Red Zone", "Sparkling Zone"
        targetTempCelsius?: number;
    };
}

export interface Bottle {
    id: string;
    ownerId: string;
    cabinetId: string;
    location: {
        row: number;
        col: number;
        depthIndex: number;
    };
    details: {
        name: string;
        winery: string;
        vintage: string;
        type: 'Red' | 'White' | 'Rose' | 'Sparkling' | 'Dessert' | 'Other';
        country?: string;
        region?: string;
        grape?: string;
        price?: number; // In user's currency
        volume?: number; // In milliliters (750 = standard bottle)
    };
    labelImage?: string; // Firebase Storage URL
    bottleImage?: string; // Firebase Storage URL
    barcode?: string; // EAN-13 or similar
    status: 'stored' | 'consumed';
    addedDate: string; // ISO string
    consumedDate?: string; // ISO string
    rating?: number; // 1-10
    notes?: string;
    peakDrinkingWindow?: {
        start: number; // Year
        end: number; // Year
    };
}

export interface WineLabelData {
    name?: string;
    winery?: string;
    vintage?: string;
    country?: string;
    region?: string;
    grape?: string;
    alcohol?: string;
    volume?: string;
    barcode?: string;
}

export interface VivinoProduct {
    id: number;
    name: string;
    vineyard?: string;
    year?: number;
    country: {
        code: string;
        name: string;
    };
    region?: {
        name: string;
    };
    type: string;
    varietal?: {
        name: string;
    };
    image?: string;
}
