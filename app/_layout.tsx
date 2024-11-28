import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as SplashScreen from 'expo-splash-screen';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" translucent backgroundColor='#fff'/>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[productId]" options={{headerTitle: '', headerShadowVisible: false }} />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
