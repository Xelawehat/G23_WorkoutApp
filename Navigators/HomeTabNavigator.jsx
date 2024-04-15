import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from '../Pages/home';
import SettingsPage from '../Pages/settings';
import CalendarPage from '../Pages/calendar'
import CreatedWorkout from '../Pages/createWorkoutScreen'
import WorkoutDetailsPage from '../Pages/workoutDetails'

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Create a separate stack navigator for the Calendar page
const CalendarStack = () => (
  <Stack.Navigator
    initialRouteName="Calendar"
    screenOptions={{headerShown: false}}
    >

    <Stack.Screen name="Calendar" component={CalendarPage} />
    <Stack.Screen name="CreateWorkout" component={CreatedWorkout} />
    <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsPage} />
  </Stack.Navigator>
);

export default function HomeTabNavigator() {
  return (
    // <NavigationContainer>
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'white' }} activeColor="black" >
      <Tab.Screen name="Calendar" component={CalendarStack}   // Calendar Screen
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
    // </NavigationContainer>
  );
}
