import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import exercisesData from './exercises.json';
//import createdWorkout from './Pages/createWorkoutScreen'

const CalendarPage = ({ navigation }) => {
  const workoutsArray = [
    {
      Name: "Chest Day",
      Time: "45",
      Difficulty: "3",
      Favorite: true,
      TimesCompleted: "0",
      Date: "2024-04-10", // format "year-month-day"
      Exercises: [
        {
          "Name": "Bench Press",
          "MuscleGroup": ["Chest","Triceps"],
          "Sets": "0",
          "Reps": "0",
          "Weight": "225",
          "Difficulty": "0",
          "PersonalBest": "0",
          "Favorite": false
        },
        {
          "Name": "Incline Bench Press",
          "MuscleGroup": ["Chest","Triceps"],
          "Sets": "0",
          "Reps": "0",
          "Weight": "0",
          "Difficulty": "0",
          "PersonalBest": "0",
          "Favorite": false
        },
        {
          "Name": "Dumbbell Chest Press",
          "MuscleGroup": ["Chest", "Triceps"],
          "Sets": "0",
          "Reps": "0",
          "Weight": "0",
          "Difficulty": "0",
          "PersonalBest": "0",
          "Favorite": false
        }
      ]
    },
    // Add more workouts here
    {
      Name: "Leg Day",
      Time: "60",
      Difficulty: "3",
      Favorite: false,
      TimesCompleted: "0",
      Date: "2024-04-10",
      Exercises: [
        {
        "Name": "Deadlifts",
        "MuscleGroup": ["Back","Legs"],
        "Sets": "0",
        "Reps": "0",
        "Weight": "0",
        "Difficulty": "0",
        "PersonalBest": "0",
        "Favorite": false
      },
      {
        "Name": "Squats",
        "MuscleGroup": ["Legs"],
        "Sets": "0",
        "Reps": "0",
        "Weight": "0",
        "Difficulty": "0",
        "PersonalBest": "0",
        "Favorite": false
      }
    ]
    },
    {
      Name: "Back and Bi'",
      Time: "45",
      Difficulty: "3",
      Favorite: false,
      TimesCompleted: "0",
      Date: "2024-04-20",
      Exercises: [
        {
        "Name": "Dumbbell Rows",
        "MuscleGroup": ["Back", "Biceps"],
        "Sets": "0",
        "Reps": "0",
        "Weight": "0",
        "Difficulty": "0",
        "PersonalBest": "0",
        "Favorite": false
      },
      {
        "Name": "Bent Over Rows",
        "MuscleGroup": ["Back"],
        "Sets": "0",
        "Reps": "0",
        "Weight": "0",
        "Difficulty": "0",
        "PersonalBest": "0",
        "Favorite": false
      }
    ]
    },
  ];

  const [selected, setSelected] = useState(''); // For selected day in calendar
  const [exercises, setExercises] = useState([]); // For json/flatlist
  const [selectedWorkouts, setSelectedWorkouts] = useState(null); // for workouts scheduled

  useEffect(() => {
    setExercises(exercisesData); // Set the exercises data from the imported JSON file
  }, []);

    // Marked Dates oject creation
    const markedDates = {};
    workoutsArray.forEach(workout => {
      markedDates[workout.Date] = { marked: true, dotColor: 'orange' };
    });

    const handleDayPress = day => {
      setSelected(day.dateString);
      //alert('Add workout here')
      //convertTypeAcquisitionFromJson
      //navigation.navigate('CreateWorkout');
      console.log('Day Selected',day);

      // checks for workouts scheduled on selected day
      const selectedWorkouts = workoutsArray.filter(workout => workout.Date === day.dateString);
      setSelectedWorkouts(selectedWorkouts);
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
              <Text style={styles.workoutName}>{workout.Name}</Text>
              <Text style={styles.workoutTime}>~{workout.Time} minutes</Text>
              <Text style={styles.workoutTime}>Date: {workout.Date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

  return (
    <View>
      <Calendar
        style={{ height: 350, paddingTop: 25, paddingBottom: 25 }}
        calendarColor={'white'}
        calendarHeaderStyle={{ color: 'black', fontSize: 22 }}
        dateNumberStyle={{ color: 'black', fontSize: 20 }}
        dateNameStyle={{ color: 'black', fontSize: 12 }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
        highlightDateNumberStyle={{ color: 'blue' }}
        highlightDateNameStyle={{ color: 'blue' }}

        onDayPress={handleDayPress}

        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          ...markedDates // Use the marked dates object above
        }}
      />

      <View style={styles.workoutInfoContainer}>
        {renderWorkoutInfo()}
        <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout')}>
          <FontAwesome name="plus-circle" size={36} color="blue" style={styles.addWorkoutIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={workoutsArray}
        contentContainerStyle={{gap: 5}} // Gap Between each element
        keyExtractor={(item => item.Name)}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={styles.exerciseName}>
              {item.Name} {item.Weight} lbs
            </Text>
            <Text style={styles.exerciseSubtitle}>
              Sets: {item.Sets} Reps: {item.Reps}
            </Text>
          </View>
        )}
      />
    </View>
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