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
import { useAuthStore, } from "@/hooks/useAuth";

const queryClient = new QueryClient()

export default function RootLayout() {
  const { hydrate, status } = useAuthStore()

  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    hydrate()

    if (fontsLoaded && status !== 'idle') {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, status]);

  if (!fontsLoaded || status === 'idle') {
    return null;
  }

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" translucent backgroundColor='#fff'/>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="product" options={{ headerShown: false }}/>
          <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
