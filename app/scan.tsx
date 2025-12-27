import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Appbar, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false);
      setScannedData({
        name: 'Cabernet Sauvignon',
        vintage: '2018',
        winery: 'Napa Valley Estates',
        country: 'USA',
        region: 'Napa Valley',
        price: 45,
        type: 'Red'
      });
      Alert.alert('Success', 'Bottle scanned successfully!');
    }, 2000);
  };

  const handleManualEntry = () => {
    router.push('/bottle/add');
  };

  const handleSave = () => {
    Alert.alert('Success', 'Bottle saved to your collection!');
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFF8F0' }]}>
      <Appbar.Header style={{ backgroundColor: '#FFF8F0', elevation: 2 }}>
        <Appbar.BackAction onPress={handleBack} color="#8B4513" />
        <Appbar.Content 
          title="Scan Bottle" 
          titleStyle={{ color: '#8B4513', fontWeight: 'bold' }} 
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={{ color: '#8B4513', marginBottom: 8, fontWeight: 'bold' }}>
          📷 Scan & Add
        </Text>
        <Text style={{ color: '#666', marginBottom: 20 }}>
          Use OCR or Barcode scanning to quickly add bottles to your collection
        </Text>

        {/* Scanner Area */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Camera Scanner
            </Text>
            
            <View style={styles.cameraPlaceholder}>
              <Text style={{ color: '#999', textAlign: 'center' }}>
                {scanning ? 'Scanning...' : 'Camera Preview Area'}
              </Text>
              {scanning && (
                <Text style={{ color: '#8B4513', marginTop: 8 }}>
                  Detecting label and barcode...
                </Text>
              )}
            </View>

            <Button
              mode="contained"
              onPress={handleScan}
              loading={scanning}
              disabled={scanning}
              style={{ marginTop: 12, backgroundColor: '#8B4513' }}
              labelStyle={{ fontWeight: 'bold' }}
            >
              {scanning ? 'Scanning...' : 'Start Scan'}
            </Button>
          </Card.Content>
        </Card>

        {/* Scanned Results */}
        {scannedData && (
          <Card style={[styles.card, { backgroundColor: '#F5DEB3' }]}>
            <Card.Content>
              <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
                Scanned Data
              </Text>
              
              <View style={styles.dataRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{scannedData.name}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.label}>Vintage:</Text>
                <Text style={styles.value}>{scannedData.vintage}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.label}>Winery:</Text>
                <Text style={styles.value}>{scannedData.winery}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.label}>Region:</Text>
                <Text style={styles.value}>{scannedData.region}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.value}>{scannedData.type}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>${scannedData.price}</Text>
              </View>

              <Button
                mode="contained"
                onPress={handleSave}
                style={{ marginTop: 12, backgroundColor: '#8B4513' }}
                labelStyle={{ fontWeight: 'bold' }}
              >
                Save to Collection
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Manual Entry */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 12 }}>
              Manual Entry
            </Text>
            <Text style={{ color: '#666', marginBottom: 12 }}>
              Prefer to enter details manually? Use the manual entry form.
            </Text>
            <Button
              mode="outlined"
              onPress={handleManualEntry}
              style={{ borderColor: '#8B4513' }}
              labelStyle={{ color: '#8B4513', fontWeight: 'bold' }}
            >
              Manual Entry Form
            </Button>
          </Card.Content>
        </Card>

        {/* Tips */}
        <Card style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: '#8B4513', fontWeight: 'bold', marginBottom: 8 }}>
              Scanning Tips
            </Text>
            <Text variant="bodySmall" style={{ color: '#666', lineHeight: 18 }}>
              • Ensure good lighting for best results{'\n'}
              • Hold camera steady over the label{'\n'}
              • Barcode scanning works for most wine bottles{'\n'}
              • OCR works best with clear, printed text{'\n'}
              • You can edit data after scanning
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
  cameraPlaceholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DDD',
    borderStyle: 'dashed',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
});
