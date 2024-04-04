import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from './Pages/home';
import SettingsPage from './Pages/settings';
import CalendarPage from './Pages/calendar'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'white' }} activeColor="black" >
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
    </Tab.Navigator>
    </NavigationContainer>
  );
}
