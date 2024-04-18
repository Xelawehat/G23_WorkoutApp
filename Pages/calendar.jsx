import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import exercisesData from './exercises.json';
import { Workout, Exercise, Sets } from '../Models/workoutModel'
//import createdWorkout from './Pages/createWorkoutScreen'

const CalendarPage = ({ navigation }) => {
  const workoutsArray = [
    {
      name: "Chest Day",
      time: "60 minutes",
      difficulty: 3,
      favorite: true,
      color: "red",
      timesCompleted: 0,
      date: "2024-04-10",
      exercises: [
        {
          name: "Bench Press",
          favorite: false,
          muscleGroup: ["Chest", "Triceps"],
          sets: [
            { reps: 10, weight: 225 },
            { reps: 10, weight: 225 },
            // Add more sets if needed
          ]
        },
        {
          name: "Incline Bench Press",
          favorite: false,
          muscleGroup: ["Chest", "Triceps"],
          sets: [
            { reps: 10, weight: 185 },
            { reps: 10, weight: 185 },
            // Add more sets if needed
          ]
        },
        // Add more exercises if needed
      ]
    },
    {
      name: "Back Time",
      time: "20 minutes",
      difficulty: 2,
      favorite: false,
      color: "purple",
      timesCompleted: 5,
      date: "2024-04-10",
      exercises: [
        {
          name: "Pull-ups",
          favorite: false,
          muscleGroup: ["Back", "Triceps"],
          sets: [
            { reps: 10, weight: 0 },
            { reps: 10, weight: 0 },
            // Add more sets if needed
          ]
        },
        {
          name: "Incline Bench Press",
          favorite: false,
          muscleGroup: ["Chest", "Triceps"],
          sets: [
            { reps: 10, weight: 185 },
            { reps: 10, weight: 185 },
            // Add more sets if needed
          ]
        },
        // Add more exercises if needed
      ]
    },
    {
      name: "Leg Day",
      time: "90 minutes",
      difficulty: 4,
      favorite: false,
      color: "blue",
      timesCompleted: 0,
      date: "2024-04-15",
      exercises: [
        {
          name: "Deadlifts",
          favorite: false,
          muscleGroup: ["Back", "Legs"],
          sets: [
            { reps: 8, weight: 135 },
            { reps: 8, weight: 135 },
            // Add more sets if needed
          ]
        },
        {
          name: "Squats",
          favorite: false,
          muscleGroup: ["Legs"],
          sets: [
            { reps: 10, weight: 185 },
            { reps: 10, weight: 185 },
            // Add more sets if needed
          ]
        },
        // Add more exercises if needed
      ]
    },
    // Add more workout objects here
  ];
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]); // For selected day in calendar, also initializes to today
  const [exercises, setExercises] = useState([]); // For json/flatlist
  const [selectedWorkouts, setSelectedWorkouts] = useState([]); // for workouts scheduled
  console.log(selectedWorkouts);

  useEffect(() => {
    setExercises(exercisesData); // Set the exercises data from the imported JSON file
  }, []);

    // Marked Dates oject creation
    const markedDates = {};

    // Loop to get each Dot on calendar
    workoutsArray.forEach(workout => {
      workout.date = workout.date.split('T')[0]; // removes time
      const { date, color } = workout;
      console.log('Date:', date, 'Color:', color);
      if (!markedDates[date]) {
        markedDates[date] = { marked: true, dots: [{ color: color }] };
      } else {
        markedDates[date].dots.push({ color: color });
      }
    });
    
    console.log('Marked Dates:', markedDates);

    const handleDayPress = day => {
      setSelected(day.dateString);
      console.log('Day Selected', day);
      console.log('Selectedwokrouts1', selectedWorkouts);
    
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
            //onPress={() => navigation.navigate('WorkoutDetails', { workout }, {selected})}>
            onPress={() => navigation.navigate('WorkoutDetails', { workout })}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutTime}>~{workout.time} minutes</Text>
              <Text style={styles.workoutTime}>Date: {workout.date}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout', {selected})}>
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