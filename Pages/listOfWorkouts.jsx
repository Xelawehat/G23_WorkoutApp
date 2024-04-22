import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import dataArray from './dataArray';
import * as Notif from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Put your id address:
let currentIpAddress = '172.20.10.11:5000';

const ListOfWorkouts = ({ route, navigation }) => {

  const workoutsArray = dataArray();

  const workoutObj = {
    name: "",
    exercises: [],
    date: new Date(),  //still need to figure out how to get date into here
    time: route.params.time
  };

    const selectedDay = route.params.selectedDay;

    const [selectedTime, setSelectedTime] = useState(new Date()); // Initializes selectedTime to now
    const theBigOne = new Date(selectedTime);

    // Notification Scheduler
    const scheduleWorkoutNotif = (workout) => {
        const trigger = new Date(Date.parse(selectedDay));
        trigger.setTime(theBigOne.getTime());
        trigger.setSeconds(0);
    
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
    navigation.navigate('CreateWorkout', {day: selectedDay, time: theBigOne});
  };

  // Handles the continue button
  const handleContinuePress = async (workout) => {
    // Database
    const userId = await AsyncStorage.getItem('userId');

    console.log('Continue Pressed');

    // Logic to handle the "Continue" button press
    // update workout Object
    workoutObj.name = workout.name;
    workoutObj.exercises = workout.exercises;
    workoutObj.color = workout.color;
    workoutObj.date = selectedDay;
    workoutObj.time = theBigOne;

    // Add to local storage
    //dataArray().push(workoutObj);

    // Add to database
    const workoutData = workoutObj;
    //  Try to add a workout after the button is clicked here - send to db
    try {
	  
      //  TODO: a user already in the db is currently hardcoded to test if this works.
              //  find out how to replace it with the current user
			const response = await axios({
			  method: 'post',
			  url: `http://${currentIpAddress}/users/${userId}/workouts`,
        headers: {
          'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
        },
			  data:workoutData
			});
      alert('Workout Saved');
      //scheduleWorkoutNotif();
      navigation.navigate('Calendar');
		  } catch (error) {
			console.error('Error adding workout:', error.response.data);
		  }

    //////////////////////////////////////////////////
  };

  // Alert function
  const showAlert = ( workout ) => {

    let min = theBigOne.getMinutes().toString();
    if (theBigOne.getMinutes() < 10)
    {
      min = "0".concat('',min);
    }

    let hour = theBigOne.getHours().toString();
    let together = hour.concat(':',min);

    if(theBigOne.getHours() < 12)
    {
      if (theBigOne.getHours() == 0)
      {
        together = "12".concat(':',min).concat(' ', "AM");
      }
      else
      {
        together = hour.concat(':',min).concat(' ', "AM");
      }
    }
    else
    {
      if (theBigOne.getHours() == 12)
      {
        together = hour.concat(':',min).concat(' ', "PM");
      }
      else
      {
        together = (theBigOne.getHours() - 12).toString().concat(':',min).concat(' ', "PM");
      }
      
    }

    console.log('selectedTime',selectedTime);
    console.log('together',together);
    console.log('bigone', theBigOne);

    const alerttitle = ('Schedule').concat(' ',workout.name).concat('?');
    const alerttext = "Schedule for".concat(' ', together).concat('\n', "You may edit this later");

    Alert.alert(
      alerttitle,alerttext,
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
    showAlert(workout);
  };

  // const deleteWorkout = (index) => {
  //   //delete index from dataArray
  //   dataArray().splice(index, 1);
  //   console.log(dataArray);

  //   // Database workout delete function below
  // };

    //  Delete the workout
    const deleteWorkout = async ( workout ) => {

      //const workoutName = "April 8";
      const workoutName = workout.name;
    
      // // Check if the workout name is provided
      // if (!workoutName.trim()) {
      //   alert('Must enter a workout name to delete.');
      //   return;
      // }
    
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios({
          method: 'delete',
          url: `http://${currentIpAddress}/users/${userId}/workouts`,
          params: {
            name: workoutName
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        console.log('Response:', response.data);
        alert('Workout deleted successfully');
      } catch (error) {
        console.error('Error deleting workout:', error.response ? error.response.data : error.message);
        alert('Failed to delete workout. Please try again.');
      }
    };
    
    //deleteWorkout("Workout-edit");


  /////////////////////////////////////////////////////////

  // Alert function
  const deleteAlert = ( workout, index ) => {
    
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
        { text: 'Continue', onPress: () => deleteWorkout(workout) },
      ],
      { cancelable: false }
    );
  };

  const goToDeleteWorkout = ( workout, index ) => {
    console.log("goToDeleteWorkout");
    deleteAlert(workout);
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
      {dataArray().map((workout, index) => (
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
