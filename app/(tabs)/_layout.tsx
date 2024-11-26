import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarInactiveTintColor: '#5F6368',
        tabBarActiveTintColor: '#2567E8',
        tabBarStyle: {
          height: 70,
          ...Platform.select({
            ios: { position: 'absolute' },
            default: {},
          })
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: 'Inter',
          lineHeight: 16,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Octicons name="gear" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
