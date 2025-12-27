import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Appbar, FAB, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  const stats = {
    totalBottles: 2,
    totalValue: 80,
    cabinets: 1,
  };

  const handleViewCabinet = () => {
    router.push('/cabinet/demo-cabinet-1');
  };

  const handleAdvisor = () => {
    router.push('/advisor');
  };

  const handleAnalytics = () => {
    router.push('/analytics');
  };

  const handleHistory = () => {
    router.push('/history');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleAddBottle = () => {
    router.push('/bottle/add');
  };

  const handleCreateCabinet = () => {
    router.push('/cabinet/create');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0' }}>
        <Appbar.Content title="Dashboard" titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} />
        <Appbar.Action icon="cog" color="#8B4513" onPress={handleSettings} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.welcome}>
          Welcome to Wine Cellar
        </Text>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Text variant="titleLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                {stats.totalBottles}
              </Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>
                Bottles
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { flex: 1 }]}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Text variant="titleLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                ${stats.totalValue}
              </Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>
                Value
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { flex: 1 }]}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Text variant="titleLarge" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                {stats.cabinets}
              </Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>
                Cabinets
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Main Actions */}
        <Card style={styles.actionCard}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Quick Actions
            </Text>
            <View style={styles.buttonGrid}>
              <Button
                mode="contained"
                onPress={handleViewCabinet}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                View Cabinet
              </Button>
              <Button
                mode="contained"
                onPress={handleAddBottle}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                Add Bottle
              </Button>
              <Button
                mode="contained"
                onPress={handleAdvisor}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                Ask Advisor
              </Button>
              <Button
                mode="contained"
                onPress={handleAnalytics}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                Analytics
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Additional Features */}
        <View style={styles.featureRow}>
          <Card style={styles.featureCard} onPress={handleHistory}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Avatar.Icon size={48} icon="history" style={{ backgroundColor: '#F5DEB3' }} color="#8B4513" />
              <Text variant="bodyMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginTop: 8 }}>
                History
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard} onPress={handleCreateCabinet}>
            <Card.Content style={{ alignItems: 'center' }}>
              <Avatar.Icon size={48} icon="plus-box" style={{ backgroundColor: '#F5DEB3' }} color="#8B4513" />
              <Text variant="bodyMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginTop: 8 }}>
                New Cabinet
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 8 }}>
              Demo Mode Active
            </Text>
            <Text variant="bodySmall" style={{ color: '#666', lineHeight: 18 }}>
              All data is stored locally on your device. No cloud sync is required. 
              Upgrade to Premium for multi-device sync and AI features.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

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
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  welcome: {
    color: '#8B4513',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#8B4513',
    borderRadius: 8,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  infoCard: {
    backgroundColor: '#F5DEB3',
    borderRadius: 12,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    elevation: 4,
  },
});
