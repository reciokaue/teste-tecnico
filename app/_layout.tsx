import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../global.css";

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" translucent backgroundColor='#fff'/>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product-details" />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
