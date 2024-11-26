import React from 'react';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs';
import { Link, withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import Constants from 'expo-constants'
import AntDesign from '@expo/vector-icons/AntDesign';
import {TouchableOpacity, View } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

export default function Layout() {
  return (
    <>
    <MaterialTopTabs
    initialRouteName='index'
     screenOptions={{
      tabBarStyle: {
        marginTop: Constants.statusBarHeight,
        elevation: 0,
        position: 'relative'
      },
      tabBarItemStyle: {
        paddingVertical: 17,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Inter_600SemiBold',
        color: "#000"
      },
      tabBarIndicatorStyle: {
        height: 4.5,
        backgroundColor: '#2567E8'
      }
    }}>
      <MaterialTopTabs.Screen  name='index' options={{
        title: 'Produtos Masculinos'
      }} />
      <MaterialTopTabs.Screen name='female' options={{
        title: 'Produtos Femininos'
      }} />
      
    </MaterialTopTabs>
        <TouchableOpacity className='justify-center items-center right-3 absolute size-14 bg-blue-500 bottom-3 rounded-full'>
          <Link href={'/add-product'} >
            <AntDesign name="plus" size={18} color="white" />
          </Link>
        </TouchableOpacity>
    </>
  );
}
