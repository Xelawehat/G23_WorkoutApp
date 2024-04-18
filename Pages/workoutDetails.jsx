import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const WorkoutDetailsPage = ({ route }) => {
  // State variables
  const navigation = useNavigation();
  const { workout } = route.params; // Extract workout details from navigation params
  const scrollViewRef = useRef(null);
  //const [showEditIndicator, setShowEditIndicator] = useState('false'); causes an error

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= -50) { // Arbitrary threshold for detecting pull-down
      console.log('pulled up')
      navigation.navigate('EditWorkoutScreen', { workout }); // Navigate to EditWorkoutScreen
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
          <Text style={styles.workoutDate}>Date: {workout.date}</Text>
        </View>
        <View>
          <Text style={styles.sectionHeading}>Exercises:</Text>
          {workout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              
                  <Text>Set: {exercise.sets}</Text>
                  <Text>Reps: {exercise.reps}</Text>
                  <Text>Weight: {exercise.weight} lbs</Text>
            </View>
          ))}
        </View>
        <Text style={styles.goTo}>|Scroll up to edit workout|</Text>
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
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseItem: {
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goTo: {
    fontSize: 13,
    alignContent: 'center',
    justifyContent: 'center'
  },
});

export default WorkoutDetailsPage;