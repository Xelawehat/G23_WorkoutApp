import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const WorkoutDetailsPage = ({ route }) => {
  // State variables
  const navigation = useNavigation();
  const { workout } = route.params; // Extract workout details from navigation params
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= -50) { // Arbitrary threshold for detecting pull-down
      console.log('pulled up')
      navigation.navigate('EditWorkoutScreen', { workout }); // Navigate to EditWorkoutScreen
      
      console.log('This is route', route)
      //route.navigation.navigate('EditWorkout', { workout });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Adjust as needed for performance
      >
      <View style={styles.header}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <Text style={styles.workoutTime}>Time: {workout.time} minutes</Text>
        <Text style={styles.workoutDate}>Date: {workout.date}</Text>
        {/* {<Text key={index}>
                Exercise Name: {exercise.name} {"\n\t"} Sets: {exercise.sets}, Reps: {exercise.sets}, Weight: {exercise.Weight} lbs {"\n"}
            </Text>} */}
      </View>
      
      </ScrollView>
    </SafeAreaView>
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

export default WorkoutDetailsPage;
