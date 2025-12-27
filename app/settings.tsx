import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Appbar, Button, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your bottles and cabinets. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear Data', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'All data has been cleared.');
        }}
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data export will be prepared and downloaded shortly.');
  };

  const handleSubscription = () => {
    router.push('/subscription');
  };

  const handleScan = () => {
    router.push('/scan');
  };

  const handleBulkAdd = () => {
    router.push('/bottle/bulkAdd');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFF8F0' }]}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0', elevation: 2 }}>
        <Appbar.BackAction onPress={handleBack} color="#8B4513" />
        <Appbar.Content 
          title="Settings" 
          titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} 
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={{ color: '#8B4513', marginBottom: 16, fontWeight: 'bold' }}>
          App Settings
        </Text>

        {/* Data Management */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Data Management
            </Text>
            <View style={styles.buttonGroup}>
              <Button
                mode="outlined"
                onPress={handleExportData}
                style={styles.outlineButton}
                labelStyle={styles.outlineLabel}
              >
                Export Data
              </Button>
              <Button
                mode="outlined"
                onPress={handleClearData}
                style={[styles.outlineButton, { borderColor: '#DC143C' }]}
                labelStyle={[styles.outlineLabel, { color: '#DC143C' }]}
              >
                Clear All Data
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Features */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Features
            </Text>
            <View style={styles.buttonGroup}>
              <Button
                mode="contained"
                onPress={handleScan}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                Scan Bottle
              </Button>
              <Button
                mode="contained"
                onPress={handleBulkAdd}
                style={styles.actionButton}
                labelStyle={styles.buttonLabel}
              >
                Bulk Add
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Subscription */}
        <Card style={[styles.card, { backgroundColor: '#F5DEB3' }]}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Avatar.Icon size={32} icon="crown" style={{ backgroundColor: '#8B4513' }} color="#FFF" />
              <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                Subscription
              </Text>
            </View>
            <Text variant="bodySmall" style={{ color: '#333', marginBottom: 12 }}>
              Upgrade to Premium for AI features, multi-cabinet support, and cloud sync.
            </Text>
            <Button
              mode="contained"
              onPress={handleSubscription}
              style={{ backgroundColor: '#8B4513' }}
              labelStyle={{ fontWeight: 'bold', color: '#FFF' }}
            >
              View Plans
            </Button>
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 8 }}>
              About
            </Text>
            <Text variant="bodySmall" style={{ color: '#666', lineHeight: 18 }}>
              Wine Cabinet App v1.0.0
            </Text>
            <Text variant="bodySmall" style={{ color: '#666', lineHeight: 18, marginTop: 4 }}>
              A digital twin for your wine collection. Track inventory, get AI pairing recommendations, and manage your cellar.
            </Text>
          </Card.Content>
        </Card>

        {/* Demo Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 8 }}>
              Demo Mode
            </Text>
            <Text variant="bodySmall" style={{ color: '#666', lineHeight: 18 }}>
              All data is stored locally on your device. No cloud sync is active. 
              This is a fully functional demo of the Wine Cabinet App.
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  buttonGroup: {
    gap: 8,
  },
  outlineButton: {
    borderColor: '#8B4513',
    borderRadius: 8,
  },
  outlineLabel: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#8B4513',
    borderRadius: 8,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
