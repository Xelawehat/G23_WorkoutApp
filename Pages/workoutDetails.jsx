import React, { useState, useEffect } from 'react';
import { View, Text, Flatlist, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import exercisesData from './exercises.json';

const WorkoutDetailsPage = ({ route }) => {
  // State variables
  const { workout } = route.params; // Extract workout details from navigation params
  // Render the workout details UI here

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.workoutName}>{workout.Name}</Text>
        <Text style={styles.workoutTime}>Time: {workout.Time} minutes</Text>
        <Text style={styles.workoutDate}>Date: {workout.Date}</Text>
        <Text style={styles.workoutDate}>
            Testing the test: {"\n"}
            {workout.Exercises ? (workout.Exercises.map((exercise, index) => (
            <Text key={index}>
                Exercise Name: {exercise.Name} {"\n\t"} Sets: {exercise.Sets}, Reps: {exercise.Reps}, Weight: {exercise.Weight} lbs {"\n"}
            </Text>
            ))) : (<Text>No exercises found</Text>)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  workoutTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  workoutDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  exerciseItem: {
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Want to add under text but causing errors
/*<Flatlist
        data={workout.Exercises}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.Name}</Text>
            <Text>Sets: {item.Sets}, Reps: {item.Reps}, Weight: {item.Weight} lbs</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />*/

export default WorkoutDetailsPage;