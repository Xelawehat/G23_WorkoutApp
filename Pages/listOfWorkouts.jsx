import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListOfWorkouts = ({ route, navigation }) => {

  const date = route.params.selectedDay;
  const goToCreateWorkout = () => {
    navigation.navigate('CreateWorkout', date);
  };

  const selectWorkout = (workoutId) => {
    // Logic to select the workout with the given ID
    console.log('Selected workout:', workoutId);
    // Navigate to the next screen or perform any other action
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Workouts</Text>
      <TouchableOpacity style={styles.button} onPress={goToCreateWorkout}>
        <Text style={styles.buttonText}>Create New Workout</Text>
      </TouchableOpacity>
      {/* Render the list of previously created workouts */}
      {/* Example of rendering workouts */}
      <TouchableOpacity
        style={styles.workoutItem}
        onPress={() => selectWorkout('workout1')}
      >
        <Text>Workout 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.workoutItem}
        onPress={() => selectWorkout('workout2')}
      >
        <Text>Workout 2</Text>
      </TouchableOpacity>
      {/* Add more TouchableOpacity components for each workout */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  workoutItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ListOfWorkouts;
