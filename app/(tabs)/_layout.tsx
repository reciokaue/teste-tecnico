import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <EvilIcons name="gear" size={24} color={color} />
          ,
        }}
      />
    </Tabs>
  );
}
