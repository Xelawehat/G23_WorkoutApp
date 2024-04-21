import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import exercisesData from './exercises.json';
import dataArray from './dataArray';
import getUserWorkouts from '../Backend/backendFunctions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPage = ({ navigation }) => {

  //const workoutsArray = getUserWorkouts();
  console.log('the big payload', workoutsArray);
  const workoutsArray = dataArray;

  //  ADDED
  //const [workoutsArray, setWorkoutsArray] = useState([]); //  State to store workouts // add in for database
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]); // For selected day in calendar, also initializes to today
  const [exercises, setExercises] = useState([]); // For json/flatlist
  const [selectedWorkouts, setSelectedWorkouts] = useState([]); // for workouts scheduled
  console.log(selectedWorkouts);

  useEffect(() => {

    setExercises(exercisesData); // Set the exercises data from the imported JSON file

      //  ADDED
  const getUserWorkouts = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId'); // Assuming the userId is stored in AsyncStorage
        console.log(userId);
        if (!userId) {
            console.log('User ID is null, check AsyncStorage setup');
            return;
        }

        const response = await axios.get(`http://${currentIpAddress}/users/${userId}/workouts`);
        console.log('Fetched Workouts:', response.data);
        setWorkoutsArray(response.data);
    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
};

    getUserWorkouts();
    // setExercises(exercisesData); // Set the exercises data from the imported JSON file
  }, []);

    // Marked Dates oject creation
    const markedDates = {};

    // Loop to get each Dot on calendar
    workoutsArray.forEach(workout => {
      //workout.date = workout.date.split('T')[0]; // removes time from date
      const { date, color } = workout;
      if (!markedDates[date]) {
        markedDates[date] = { marked: true, dots: [{ color: color }] };
      } else {
        markedDates[date].dots.push({ color: color });
      }
    });

    const handleDayPress = day => {
      setSelected(day.dateString);
      console.log('Day Selected', day);
    
      // checks for workouts scheduled on selected day
      const filteredWorkouts = workoutsArray.filter(workout => workout.date === day.dateString);
      console.log('Selected Workouts', filteredWorkouts); // Add this line for debugging
      setSelectedWorkouts(filteredWorkouts);
    };
    
    const renderWorkoutInfo = () => {
      if (!selectedWorkouts || selectedWorkouts.length === 0) { // No workouts scheduled for selected day
        return (
          <View style={styles.nothingPlannedContainer}>
            <Text style={styles.nothingPlanned}>Rest Day</Text>
          </View>
        );
      }
      return ( // Displays all workouts for selected day below calendar
        <View>
          {selectedWorkouts.map((workout, index) => (
            <TouchableOpacity key={index} style={styles.workoutItem}
            onPress={() => navigation.navigate('WorkoutDetails', { workout })}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutTime}>Date: {workout.date}</Text>
              <Text style={styles.workoutTime}>Time: {new Date(workout.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

  return (
    <SafeAreaView>
      <ScrollView>
      <Calendar
      markingType={'multi-dot'}
        style={{ height: 350, paddingTop: 25, paddingBottom: 25 }}
        calendarColor={'white'}
        calendarHeaderStyle={{ color: 'black', fontSize: 22 }}
        ateNumberStyle={{ color: 'black', fontSize: 20 }}
        dateNameStyle={{ color: 'black', fontSize: 12 }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
        highlightDateNumberStyle={{ color: 'blue' }}
        highlightDateNameStyle={{ color: 'blue' }}

        onDayPress={handleDayPress}

        markedDates={{
          [selected]: { selected: true, disableTouchEvent: false, selectedDotColor: 'orange' }, // selectedcolor: 'purple'
          ...markedDates // Use the marked dates object above
        }}
      />

      <View style={styles.workoutInfoContainer}>
        {renderWorkoutInfo()}
        <TouchableOpacity onPress={() => navigation.navigate('ListOfWorkouts', { selectedDay: selected })}>
          <FontAwesome name="plus-circle" size={36} color="blue" style={styles.addWorkoutIcon} />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  listContainer: {
    //flex: 1,
    backgroundColor: 'gainsboro',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5%', // Space between Flatlist objects
    borderRadius: '10%',
    //gap: 5,
  },
  exerciseName: {
    fontSize: 26,
  },
  exerciseSubtitle: {
    fontSize: 15,
    color: 'darkgrey'
  },
  nothingPlanned: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  workoutItem: {
    alignItems: 'center'
  },
  workoutInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutTime: {
    fontSize: 16,
  },
  addWorkoutIcon: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
})