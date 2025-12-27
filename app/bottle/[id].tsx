import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Appbar, Avatar, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MOCK_BOTTLE = {
  id: 'demo-bottle-1',
  name: 'Cabernet Sauvignon',
  winery: 'Napa Valley Estates',
  vintage: '2018',
  type: 'Red',
  country: 'USA',
  region: 'Napa Valley',
  price: 45,
  volume: 750,
  location: { row: 1, col: 2, depthIndex: 0 },
  addedDate: '2024-12-01'
};

export default function BottleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  const handleDrink = () => {
    Alert.alert(
      'Drink Bottle',
      'Are you sure you want to mark this bottle as consumed? You can rate it afterwards.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Drink', onPress: () => {
          Alert.prompt(
            'Rate This Wine',
            'How would you rate this wine? (1-10)',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Submit', onPress: (rating) => {
                Alert.alert('Enjoyed!', `You rated this wine ${rating}/10. Moved to history.`);
                router.back();
              }}
            ],
            'plain-text'
          );
        }}
      ]
    );
  };

  const handleMove = () => {
    Alert.alert('Move Bottle', 'In full version, this would allow you to move the bottle to a different location.');
  };

  const handleEdit = () => {
    Alert.alert('Edit Bottle', 'In full version, this would open the edit screen.');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Bottle',
      'Are you sure you want to delete this bottle permanently?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Deleted', 'Bottle has been removed from your collection.');
          router.back();
        }}
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFF8F0' }]}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0', elevation: 2 }}>
        <Appbar.BackAction onPress={handleBack} color="#8B4513" />
        <Appbar.Content 
          title="Bottle Details" 
          titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} 
        />
        <Appbar.Action icon="delete" color="#8B4513" onPress={handleDelete} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Icon 
            size={64} 
            icon="bottle-wine" 
            style={{ backgroundColor: '#F5DEB3' }} 
            color="#8B4513" 
          />
          <View style={styles.headerText}>
            <Text variant="headlineMedium" style={{ color: '#8B4513', fontWeight: 'bold' }}>
              {MOCK_BOTTLE.name}
            </Text>
            <Text variant="titleMedium" style={{ color: '#D2691E' }}>
              {MOCK_BOTTLE.winery}
            </Text>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text variant="labelMedium" style={{ color: '#666' }}>VINTAGE</Text>
            <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
              {MOCK_BOTTLE.vintage}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text variant="labelMedium" style={{ color: '#666' }}>TYPE</Text>
            <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
              {MOCK_BOTTLE.type}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text variant="labelMedium" style={{ color: '#666' }}>PRICE</Text>
            <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
              ${MOCK_BOTTLE.price}
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Details
            </Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Country:</Text>
              <Text style={styles.value}>{MOCK_BOTTLE.country}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Region:</Text>
              <Text style={styles.value}>{MOCK_BOTTLE.region}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Volume:</Text>
              <Text style={styles.value}>{MOCK_BOTTLE.volume}ml</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>Row {MOCK_BOTTLE.location.row}, Col {MOCK_BOTTLE.location.col}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Added:</Text>
              <Text style={styles.value}>{MOCK_BOTTLE.addedDate}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Tags */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Tags
            </Text>
            <View style={styles.tagRow}>
              <Chip mode="outlined" style={styles.tag}>
                {MOCK_BOTTLE.type}
              </Chip>
              <Chip mode="outlined" style={styles.tag}>
                {MOCK_BOTTLE.country}
              </Chip>
              {MOCK_BOTTLE.region && (
                <Chip mode="outlined" style={styles.tag}>
                  {MOCK_BOTTLE.region}
                </Chip>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Actions
            </Text>
            <View style={styles.actionGrid}>
              <Button
                mode="contained"
                onPress={handleDrink}
                style={[styles.actionButton, { backgroundColor: '#8B4513' }]}
                labelStyle={styles.buttonLabel}
              >
                Drink
              </Button>
              <Button
                mode="contained"
                onPress={handleMove}
                style={[styles.actionButton, { backgroundColor: '#D2691E' }]}
                labelStyle={styles.buttonLabel}
              >
                Move
              </Button>
              <Button
                mode="outlined"
                onPress={handleEdit}
                style={styles.outlineButton}
                labelStyle={styles.outlineLabel}
              >
                Edit
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Info */}
        <Card style={[styles.card, { backgroundColor: '#F5DEB3' }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 8 }}>
              Storage Tips
            </Text>
            <Text variant="bodySmall" style={{ color: '#333', lineHeight: 18 }}>
              Store horizontally in a cool, dark place at 12-14°C. 
              This Cabernet Sauvignon is best consumed between 2025-2030.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  content: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F5F5',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  outlineButton: {
    flex: 1,
    borderColor: '#8B4513',
    borderRadius: 8,
  },
  outlineLabel: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
});
