import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { useAuthStore } from '@/hooks/useAuth';

export default function TabLayout() {
  const { status } = useAuthStore()

  if(status === 'signOut'){
    return <Redirect href={'/(auth)/login'}/>
  }

  return (
    <Tabs
      initialRouteName='(home)'
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
          fontFamily: 'Inter_500Medium',
          lineHeight: 16,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
