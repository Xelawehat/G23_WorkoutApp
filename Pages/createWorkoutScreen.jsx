import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import exercisesData from './exercises.json';
import axios from 'axios';

//  Put your id address:
let currentIpAddress = '__here__:5000';

const CreateWorkoutScreen = () => {
  // State variables
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');

  useEffect(() => {
    // Set the available exercises from the imported JSON file
    setAvailableExercises(exercisesData);
  }, []);

  // Function to add exercise to the selected exercises list
  const addExercise = () => {
    if (selectedExercise) {
        const exerciseToAdd = availableExercises.find(exercise => exercise.Name === selectedExercise);
        setSelectedExercises([...selectedExercises, exerciseToAdd]);
    }
  };

  // Function to remove exercise from the selected exercises list
  const removeExercise = (index) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises.splice(index, 1);
    setSelectedExercises(updatedExercises);
  };

  // Function to handle saving the workout
  const saveWorkout = async () => {
    // Check if workout name is provided and at least one exercise is added
    if (!workoutName.trim()) {
        alert('Must enter a workout name.');
        return;
    }
    //  TODO: Uncomment this when icons are scrollable
    // if (selectedExercises.length === 0) {
    //     alert('Must add at least one exercise to the workout.');
    //     return;
    // }
  
    //  BACKEND CONNECTION
    // If all validations pass, proceed with saving the workout
    // Implement saving logic here, can involve sending data to a server, storing in local storage, etc.

    //Dummy Data
    const workoutData = {
      "name": "Cardio Blast",
      "time": "2024-04-14T06:30:00.000Z",
      "difficulty": 3,
      "favorite": true,
      "color": "#FF6347",
      "timesCompleted": 3,
      "date": "2024-04-14T06:30:00.000Z",
      "exercises": [
        {
          "name": "Treadmill Running",
          "muscleGroup": "Legs",
          "sets": 1,
          "reps": 1,  // Represents 30 minutes of continuous running
          "weight": 0,
          "difficulty": 3,
          "personalBest": 5, // Represents best time or distance covered
          "favorite": false
        }
      ]
    }    
    

    //  Try to add a workout after the button is clicked here - send to db
    try {
	  
      //  TODO: a user already in the db is currnetly hardcoded to test if this works.
              //  find out how to replace it with the current user
			const response = await axios({
			  method: 'post',
			  url: `http://${currentIpAddress}/users/661d0c98e9bf155e020def5e/workouts`,
        headers: {
          'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
        },
			  data:workoutData
			});
	  
			console.log('Response:', response.data);
      console.log('Workout saved:', { workoutData, selectedExercises });
      alert('Workout Saved');
		  } catch (error) {
			console.error('Error adding workout:', error.response.data);
		  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.heading}>Create Custom Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workout name"
        value={workoutName}
        onChangeText={text => setWorkoutName(text)}
      />

      <Picker
        selectedValue={selectedExercise}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedExercise(itemValue)}
      >
        <Picker.Item label="Select exercise" value="" />
        {availableExercises.map((exercise, index) => (
          <Picker.Item key={index} label={exercise.Name} value={exercise.Name} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.addButton} onPress={addExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Selected Exercises</Text>
      <ScrollView style={styles.exerciseList}>
        {selectedExercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exerciseItem}
            onPress={() => removeExercise(index)}
          >
            <Text>{exercise.Name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //justifyContent: 'center',
    //alignContent: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
    paddingBottom:  '60%',
  },
  addButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  exerciseList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CreateWorkoutScreen;