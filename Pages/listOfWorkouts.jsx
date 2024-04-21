import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import dataArray from './dataArray';
import * as Notif from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

const ListOfWorkouts = ({ route, navigation }) => {

  const workoutObj = {
    name: "",
    exercises: [],
    date: new Date(),  //still need to figure out how to get date into here
    time: route.params.time
  };

    const selectedDay = route.params.selectedDay;

    const [selectedTime, setSelectedTime] = useState(new Date());
    const theBigOne = new Date(selectedTime);

    // Notification Scheduler
    const scheduleWorkoutNotif = (workout) => {
        //const notifbody = RandomNotifText[Math.floor(Math.random() * 3)];
    
        //if (user.allowNotifs == false)
        // {
        //   return;
        // }
        const trigger = new Date(Date.parse(route.params.selectedDay));
        trigger.setTime(theBigOne.getTime());
    
        console.log('This thing is:', trigger);
        const notifbody = ("Workout today: ").concat(' ', workout.name);
        Notif.scheduleNotificationAsync({
          content: {
            title: "Workout App Notification",
            body: notifbody
          },
          trigger,
        });
      };

  // Navigate to createWorkoutPage
  const goToCreateWorkout = () => {
    const hour = theBigOne.getHours().toString();
    const min = theBigOne.getMinutes().toString();
    const together = hour.concat(':',min);
    navigation.navigate('CreateWorkout', {day: selectedDay, time: theBigOne.getTime()});
  };

  // Handles the continue button
  const handleContinuePress = (workout) => {
    console.log('Continue Pressed');

    // Logic to handle the "Continue" button press
    // update workout Object
    workoutObj.name = workout.name;
    workoutObj.exercises = workout.exercises;
    workoutObj.color = workout.color;
    workoutObj.date = selectedDay;
    workoutObj.time = theBigOne;
    console.log('\n\nWorkoutObj:',workoutObj);

    // Add to local storage
    dataArray.push(workoutObj);

    // Add to database


    scheduleWorkoutNotif(workout);
    navigation.navigate('Calendar');
  };

  // Alert function
  const showAlert = ( workout ) => {

    const hour = theBigOne.getHours().toString();
    const min = theBigOne.getMinutes().toString();
    const together = hour.concat(':',min);
    console.log('selectedTime',selectedTime);
    console.log('together',together);
    console.log('bigone', theBigOne);

    Alert.alert(
      ('Schedule').concat(' ',workout.name).concat('?'),
      //together.concat('You may edit this later.'),
      ('\nYou may edit this later.'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Continue', onPress: () => handleContinuePress(workout) },
      ],
      { cancelable: false }
    );
  };

  // Handle Time Change
  const handleTimeChange = (event, selected) => {
    setSelectedTime(selected);
  };

  const selectWorkout = (workout) => {
    // Logic to select the workout with the given ID
    console.log('Selected workout:', workout);
    // Navigate to the next screen or perform any other action
    showAlert(workout);
  };

  const deleteWorkout = (index) => {
    console.log(dataArray);
    //delete index from dataArray
    dataArray.splice(index, 1);
    console.log(dataArray);
  };

  // Alert function
  const deleteAlert = ( workout, index ) => {
    // I cannot get the alert to show up without all the information in it
    //Successfully deletes the workout from dataArray if continue is pressed, but alert is messed up
    const hour = theBigOne.getHours().toString();
    const min = theBigOne.getMinutes().toString();
    const together = hour.concat(':',min);
    console.log('selectedTime',selectedTime);
    console.log('together',together);
    console.log('theBigOne',theBigOne);

    Alert.alert(
      ('Delete').concat(' ', workout.name).concat('?'),
      ('\nYour workout will be lost.'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Continue', onPress: () => deleteWorkout(index) },
      ],
      { cancelable: false }
    );
  };

  const goToDeleteWorkout = ( workout, index ) => {
    console.log("goToDeleteWorkout");
    deleteAlert(workout, index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick a Time:</Text>
      <DateTimePicker
        value={selectedTime || new Date()}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={handleTimeChange}
      />

    <Text style={styles.heading}>Select a workout for {route.params.selectedDay}:</Text>
    <ScrollView>
      {/* Render the list of previously created workouts */}
      {dataArray.map((workout, index) => (
        <TouchableOpacity
          key={index}
          style={styles.workoutItem}
          onPress={() => selectWorkout(workout)}
          onLongPress={() => goToDeleteWorkout(workout, index)}
        >
          <Text>{workout.name}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>

    <TouchableOpacity style={styles.button} onPress={goToCreateWorkout}>
        <Text style={styles.buttonText}>Create New Workout</Text>
    </TouchableOpacity>

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
