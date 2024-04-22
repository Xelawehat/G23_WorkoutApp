import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'

import exampleData from './examples.json';
import { useSelector } from 'react-redux';
import editWorkout from '../api/editWorkout';


const EditWorkoutScreen = ({ route, navigation }) => {

  const { workout } = route.params;

  // Redux user data
  const userData = useSelector((state) => state.userData);

  // State variables
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [selectedExercises, setSelectedExercises] = useState(workout.exercises);
  const [availableExercises, setAvailableExercises] = useState(exampleData);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(''); // State variable for sets
  const [reps, setReps] = useState(''); // State variable for reps
  const [weight, setWeight] = useState(''); // State variable for weight
  const [selectedColor, setSelectedColor] = useState(workout.color);
  const [selectedTime, setSelectedTime] = useState('');
  const theBigOne = new Date(selectedTime);

  // Array of color options
  const colorOptions = ['red', 'blue', 'green', 'yellow'];

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  // Function to add exercise to the selected exercises list
  // Function to add exercise to the selected exercises list
  const addExercise = () => {
    if (!selectedExercise){
      alert("Must select an exercise");
      return;
    }
    if (sets <= 0 || sets > 15){
      alert("Sets must be between 1 and 15");
      return;
    }
    if (reps <= 0 || reps > 30){
      alert("Reps must be between 1 and 30");
      return;
    }
    if (weight <= 0 || weight > 585){
      alert("Weight must be between 1 and 585");
      return;
    }

    // //Stores temporary exercise objects each time Add Exercise button is pressed
    const exerciseObj = {
      name: "",
      sets: 0,
      reps: 0,
      weight: 0
    };
    
    if (selectedExercise) {
        const exerciseToAdd = availableExercises.find(exercise => exercise.name === selectedExercise);
        exerciseObj.name = exerciseToAdd.name;
        exerciseObj.weight = weight;
        exerciseObj.reps = reps;
        exerciseObj.sets = sets;
        console.log('Added', exerciseObj);
        setSelectedExercises([...selectedExercises, exerciseObj]);
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

    const userId = userData._id;

    // Check if workout name is provided and at least one exercise is added
    if (!workoutName.trim()) {
        alert('Must enter a workout name.');
        return;
    }

    // Check if thre is an exercise added
    if (selectedExercises.length === 0) {
        alert('Must add at least one exercise to the workout.');
        return;
    }

    const hour = theBigOne.getHours().toString();
    const min = theBigOne.getMinutes().toString();
    const together = hour.concat(':',min);

    // update workout Object
    const oldName = workout.name;
    console.log("Old name: ", oldName);
    workout.name = workoutName;
    workout.exercises = selectedExercises;
    workout.color = selectedColor;
    workout.date = workout.date;
    workout.time = theBigOne;
    console.log("TYPE OF TIME: ", typeof workout.time);
    console.log("THE ACTUAL TIME: ", workout.time);
    console.log('\n\nWorkout:',workout);

  //  Edit the workout in the database
  try 
  {
    console.log("OLD NAME BEING PASSED: ", oldName);

    const workoutData = {
      // workoutId: workout._id,
      oldName: oldName,
      workoutUpdate: workout
    };

    const response = await editWorkout(userId, workoutData);

    console.log('Response:', response.data);
  } 
  catch (error) 
  {
    console.error('Error adding workout:', error.response.data);
  }

  //scheduleWorkoutNotif();
  alert('Workout Saved');
  navigation.navigate('WorkoutDetails', {workout});
  };

  const handleTimeChange = (event, selected) => {
    setSelectedTime(selected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.heading}>Edit Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workout name"
        value={workoutName}
        onChangeText={text => setWorkoutName(text)}
        //onChangeText={text => setWorkout({...workout, name: text})}
      />

      <Text style={styles.subheading}>Edit Workout Time</Text>
      {/* Add time scroll here */}
      <DateTimePicker
        value={selectedTime || new Date()}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={handleTimeChange}
      />
      
      {/* Render color dots for color selection */}
        <View style={styles.colorSelector}>
          {colorOptions.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorDot, { backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' }]}
              onPress={() => handleColorSelection(color)}
            />
          ))}
        </View>

      <Text style={styles.subheading}>Add Exercises to Workout</Text>
      <Picker
        selectedValue={selectedExercise}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedExercise(itemValue)}
      >
        <Picker.Item label="Select exercise" value="" />
        {availableExercises.map((exercise, index) => (
          <Picker.Item key={index} label={exercise.name} value={exercise.name} />
        ))}
      </Picker>
      
      <View>
          <View style={styles.row}>
          <TextInput // For Sets
            style={styles.subInput}
            placeholder="Enter Sets"
            value={sets}
            onChangeText={text => setSets(text)}
            keyboardType='numeric'
          />
          <View style={styles.rowSpacer} />
          <TextInput
            style={styles.subInput}
            placeholder="Enter Reps"
            value={reps}
            onChangeText={text => setReps(text)}
            keyboardType='numeric'
          />
          <View style={styles.rowSpacer} />
          <TextInput
            style={styles.subInput}
            placeholder="Enter Weight"
            value={weight}
            onChangeText={text => setWeight(text)}
            keyboardType='numeric'
          />

          <View style={styles.rowSpacer} />
          </View>
        </View>

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
            <Text>{exercise.name}{'\n\t'}
            {'Sets: '}{exercise.sets}{'\t'}
            {'Reps: '}{exercise.reps}{'\t'}
            {exercise.weight}{' lbs'}</Text>
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
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subheading: {
    fontSize: 20,
    paddingLeft: '5%'
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    marginHorizontal: 5,
    marginBottom: 10
  },
  picker: {
    height: 40,
    marginBottom: 10,
    paddingBottom:  '55%',
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
  subInput: {
    height: 40,
    width: 120,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '2.5%',
    height: 50,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
export default EditWorkoutScreen;