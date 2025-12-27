import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#8B4513',
    secondary: '#D2691E',
    background: '#FFF8F0',
    surface: '#FFFFFF',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="advisor" options={{ headerShown: false }} />
        <Stack.Screen name="analytics" options={{ headerShown: false }} />
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="scan" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="bottle/add" options={{ headerShown: false }} />
        <Stack.Screen name="bottle/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="cabinet/create" options={{ headerShown: false }} />
        <Stack.Screen name="cabinet/[id]" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
