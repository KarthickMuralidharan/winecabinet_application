import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, Card, Appbar, FAB, Avatar, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MOCK_BOTTLES = [
  {
    id: 'demo-bottle-1',
    name: 'Cabernet Sauvignon',
    winery: 'Napa Valley Estates',
    vintage: '2018',
    type: 'Red',
    country: 'USA',
    region: 'Napa Valley',
    price: 45,
    location: { row: 1, col: 2, depthIndex: 0 }
  },
  {
    id: 'demo-bottle-2',
    name: 'Chardonnay',
    winery: 'Burgundy Estates',
    vintage: '2020',
    type: 'White',
    country: 'France',
    region: 'Burgundy',
    price: 35,
    location: { row: 2, col: 3, depthIndex: 0 }
  }
];

export default function CabinetDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [cabinet, setCabinet] = useState<any>(null);
  const [bottles, setBottles] = useState(MOCK_BOTTLES);

  useEffect(() => {
    const mockCabinet = {
      id: 'demo-cabinet-1',
      name: 'My Wine Cabinet',
      type: 'cabinet',
      dimensions: { rows: 5, columns: 6, depth: 2 }
    };
    setCabinet(mockCabinet);
  }, [id]);

  const handleAddBottle = () => {
    router.push('/bottle/add');
  };

  const handleViewBottle = (bottleId: string) => {
    router.push(`/bottle/${bottleId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (!cabinet) {
    return (
      <View style={[styles.center, { backgroundColor: '#FFF8F0' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#FFF8F0' }]}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0', elevation: 2 }}>
        <Appbar.BackAction onPress={handleBack} color="#8B4513" />
        <Appbar.Content 
          title={cabinet.name} 
          titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} 
        />
        <Appbar.Action 
          icon="plus" 
          color="#8B4513" 
          onPress={handleAddBottle} 
        />
      </Appbar.Header>

      {/* Cabinet Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text variant="labelMedium" style={{ color: '#666' }}>TYPE</Text>
          <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
            {cabinet.type === 'room' ? 'Walk-in Cellar' : 'Wine Cabinet'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text variant="labelMedium" style={{ color: '#666' }}>DIMENSIONS</Text>
          <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
            {cabinet.dimensions.rows}x{cabinet.dimensions.columns}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text variant="labelMedium" style={{ color: '#666' }}>BOTTLES</Text>
          <Text variant="bodyLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
            {bottles.length}
          </Text>
        </View>
      </View>

      {/* Grid Visualization */}
      <View style={styles.gridContainer}>
        <Text variant="titleMedium" style={{ color: '#8B4513', marginBottom: 12, fontWeight: 'bold' }}>
          Storage Grid
        </Text>
        <View style={styles.grid}>
          {Array.from({ length: cabinet.dimensions.rows }).map((_, row) => (
            <View key={row} style={styles.gridRow}>
              {Array.from({ length: cabinet.dimensions.columns }).map((_, col) => {
                const hasBottle = bottles.some(b => b.location.row === row + 1 && b.location.col === col + 1);
                return (
                  <View
                    key={col}
                    style={[
                      styles.gridCell,
                      hasBottle && styles.gridCellOccupied,
                      { width: 20, height: 20, margin: 2 }
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
        <View style={styles.gridLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#E0E0E0' }]} />
            <Text style={{ fontSize: 11, color: '#666' }}>Empty</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#8B4513' }]} />
            <Text style={{ fontSize: 11, color: '#666' }}>Occupied</Text>
          </View>
        </View>
      </View>

      {/* Bottles List */}
      <FlatList
        data={bottles}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListHeaderComponent={
          <Text variant="titleMedium" style={{ color: '#8B4513', marginBottom: 12, fontWeight: 'bold' }}>
            Stored Bottles
          </Text>
        }
        renderItem={({ item }) => (
          <Card 
            style={[styles.card, { backgroundColor: '#FFFFFF', elevation: 2 }]} 
            onPress={() => handleViewBottle(item.id)}
          >
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  <Text variant="bodySmall" style={{ color: '#D2691E', marginTop: 2 }}>
                    {item.winery} • {item.vintage}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                    <Chip 
                      mode="outlined" 
                      compact 
                      textStyle={{ fontSize: 10 }}
                      style={{ height: 24 }}
                    >
                      {item.type}
                    </Chip>
                    <Chip 
                      mode="outlined" 
                      compact 
                      textStyle={{ fontSize: 10 }}
                      style={{ height: 24 }}
                    >
                      {item.country}
                    </Chip>
                    {item.region && (
                      <Chip 
                        mode="outlined" 
                        compact 
                        textStyle={{ fontSize: 10 }}
                        style={{ height: 24 }}
                      >
                        {item.region}
                      </Chip>
                    )}
                  </View>
                  <Text variant="bodySmall" style={{ color: '#999', marginTop: 4 }}>
                    Location: Row {item.location.row}, Col {item.location.col}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                    ${item.price}
                  </Text>
                  <Avatar.Icon 
                    size={32} 
                    icon="bottle-wine" 
                    style={{ backgroundColor: '#F5DEB3', marginTop: 4 }} 
                    color="#8B4513" 
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: '#8B4513' }]}
        onPress={handleAddBottle}
        label="Add Bottle"
        color="#FFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoRow: { 
    flexDirection: 'row', 
    padding: 16, 
    gap: 8,
    backgroundColor: '#F5DEB3',
    margin: 16,
    borderRadius: 12
  },
  infoItem: { flex: 1, alignItems: 'center' },
  gridContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16
  },
  grid: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8
  },
  gridRow: { flexDirection: 'row' },
  gridCell: {
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  gridCellOccupied: {
    backgroundColor: '#8B4513',
    borderColor: '#6B3410'
  },
  gridLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999'
  },
  card: { marginBottom: 12, borderRadius: 12, overflow: 'hidden' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, elevation: 4 }
});
