import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from './Pages/home';
import SettingsPage from './Pages/settings';
import CalendarPage from './Pages/calendar'
import ProfilePage from './Pages/profile';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator labeled={true} barStyle={{ backgroundColor: 'white' }} activeColor="black" >
      <Tab.Screen name="Calendar" component={CalendarPage}   // Calendar Screen
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-month" color={"black"} size={26}/>
            ),
        }}/>
      <Tab.Screen name="Home" component={HomePage}            //Home Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"black"} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Settings" component={SettingsPage}      // Settings Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={"black"} size={26}/>
        ),
    }}/>
    <Tab.Screen name="Profile" component={ProfilePage}      // Profile Screen, use this only for testing (this should only be accessible from settings page)
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={"black"} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}
