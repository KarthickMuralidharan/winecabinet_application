import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, Card, Appbar, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function AdvisorScreen() {
  const router = useRouter();
  const [meal, setMeal] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const mockRecommendations = [
    {
      name: 'Cabernet Sauvignon',
      vintage: '2018',
      winery: 'Napa Valley Estates',
      reason: 'Perfect pairing for grilled steak with pepper sauce. The bold tannins and dark fruit notes complement the richness of the meat.'
    },
    {
      name: 'Chardonnay',
      vintage: '2020',
      winery: 'Burgundy Estates',
      reason: 'Great with creamy dishes. The buttery notes and balanced acidity work well with rich flavors.'
    }
  ];

  const handleGetRecommendations = () => {
    if (!meal.trim()) {
      Alert.alert('Error', 'Please enter what you are eating');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFF8F0' }]}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0', elevation: 2 }}>
        <Appbar.BackAction onPress={handleBack} color="#8B4513" />
        <Appbar.Content 
          title="Sommelier AI" 
          titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} 
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={{ color: '#8B4513', marginBottom: 8, fontWeight: 'bold' }}>
          🤖 AI Wine Advisor
        </Text>
        <Text style={{ color: '#666', marginBottom: 20 }}>
          Get personalized wine recommendations from your collection based on your meal
        </Text>

        <Card style={{ backgroundColor: '#FFFFFF', elevation: 2, marginBottom: 20 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', marginBottom: 12, fontWeight: 'bold' }}>
              What are you eating?
            </Text>
            <TextInput
              mode="outlined"
              placeholder="e.g., Grilled steak with pepper sauce"
              value={meal}
              onChangeText={setMeal}
              multiline
              numberOfLines={3}
              style={{ backgroundColor: '#FFF' }}
              theme={{ colors: { primary: '#8B4513' } }}
            />
            <Button
              mode="contained"
              onPress={handleGetRecommendations}
              loading={loading}
              style={{ marginTop: 12, backgroundColor: '#8B4513' }}
              contentStyle={{ height: 48 }}
              labelStyle={{ fontWeight: 'bold' }}
            >
              Get Recommendations
            </Button>
          </Card.Content>
        </Card>

        {loading && (
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <ActivityIndicator size="large" color="#8B4513" />
            <Text style={{ color: '#8B4513', marginTop: 10 }}>Analyzing your collection...</Text>
          </View>
        )}

        {recommendations.length > 0 && (
          <View>
            <Text variant="titleMedium" style={{ color: '#8B4513', marginBottom: 12, fontWeight: 'bold' }}>
              Recommended Pairings
            </Text>
            {recommendations.map((wine, index) => (
              <Card key={index} style={{ backgroundColor: '#FFFFFF', elevation: 2, marginBottom: 12 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                      {wine.name}
                    </Text>
                    <Text variant="bodyMedium" style={{ color: '#D2691E', fontWeight: 'bold' }}>
                      {wine.vintage}
                    </Text>
                  </View>
                  <Text variant="bodySmall" style={{ color: '#666', marginBottom: 8 }}>
                    {wine.winery}
                  </Text>
                  <Text variant="bodySmall" style={{ color: '#333', lineHeight: 18 }}>
                    {wine.reason}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        <Card style={{ backgroundColor: '#F5DEB3', marginTop: 20 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', marginBottom: 8, fontWeight: 'bold' }}>
              How it works
            </Text>
            <Text variant="bodySmall" style={{ color: '#333', lineHeight: 18 }}>
              The AI analyzes your wine collection and matches it with your meal description. 
              It considers wine type, vintage, region, and flavor profiles to suggest the perfect pairing.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  content: { padding: 16, paddingBottom: 40 }
});
