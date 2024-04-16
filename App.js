import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

import HomePage from './Pages/home';
import SettingsPage from './Pages/settings';
import CalendarPage from './Pages/calendar'
import ProfilePage from './Pages/profile';
import WorkoutDetailsPage from './Pages/workoutDetails'
import CreateWorkoutScreen from './Pages/createWorkoutScreen';

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function TabNavigator(){
  return (
    <Tab.Navigator labeled={true} barStyle={{ backgroundColor: 'white' }} activeColor="black" >
      <Tab.Screen name="Calendar" component={CalendarNavigator}   // Calendar Stack (calendar, createWorkout, workoutDetails)
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-month" color={"black"} size={26}/>
            ),
        }}/>
      <Tab.Screen name="Home" component={HomeNavigator}            //Home Stack (home, createWorkout, workoutDetails)
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"black"} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Settings" component={SettingsNavigator}      // Settings Stack (settings and profile)
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={"black"} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  )
}

function SettingsNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={SettingsPage} />
      <Stack.Screen name='Profile' component={ProfilePage} />
    </Stack.Navigator>
  )
}

function HomeNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomePage} />
    </Stack.Navigator>
  )
}

function CalendarNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={CalendarPage} />
      <Stack.Screen name='CreateWorkout' component={CreateWorkoutScreen} />
      <Stack.Screen name='WorkoutDetails' component={WorkoutDetailsPage} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}
