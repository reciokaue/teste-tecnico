import * as SplashScreen from 'expo-splash-screen';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../global.css";

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <GluestackUIProvider>
      <StatusBar style="auto" translucent backgroundColor='#fff'/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product-details" />
      </Stack>
    </GluestackUIProvider>
  );
}
