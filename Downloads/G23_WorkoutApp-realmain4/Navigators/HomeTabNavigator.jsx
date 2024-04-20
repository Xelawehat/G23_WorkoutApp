import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../Pages/home';
import SettingsPage from '../Pages/settings';
import CalendarPage from '../Pages/calendar'
import CreatedWorkout from '../Pages/createWorkoutScreen'
import WorkoutDetailsPage from '../Pages/workoutDetails'
import EditWorkoutScreen from '../Pages/editWorkoutScreen'
import ProfilePage from '../Pages/profile'
import ListOfWorkouts from '../Pages/listOfWorkouts';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Create a separate stack navigator for the Calendar page
const CalendarStack = () => (
  <Stack.Navigator
    initialRouteName="Calendar"
    screenOptions={{headerShown: false}}
    >

    <Stack.Screen name="Calendar" component={CalendarPage} />
    <Stack.Screen name="CreateWorkout" component={CreatedWorkout} options={{ headerShown: true }} />
    <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsPage} options={{ headerShown: true }} />
    <Stack.Screen name="EditWorkoutScreen" component={EditWorkoutScreen} options={{ headerShown: true }} />
    <Stack.Screen name="ListOfWorkouts" component={ListOfWorkouts} options={{ headerShown: true }} />
  </Stack.Navigator>
);

function SettingsNavigator() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Settings' component={SettingsPage} />
      <Stack.Screen name='Profile' component={ProfilePage} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

function HomeNavigator() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name='Home' component={HomePage} />
    </Stack.Navigator>
  )
}

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator labeled={true} barStyle={{ backgroundColor: 'white' }} activeColor="black" >
      <Tab.Screen name="Calendar" component={CalendarStack}   // Calendar Screen
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-month" color={"black"} size={26}/>
            ),
        }}/>
      <Tab.Screen name="Home" component={HomeNavigator}            //Home Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"black"} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Settings" component={SettingsNavigator}      // Settings Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={"black"} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  );
}
