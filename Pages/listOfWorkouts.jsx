import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import dataArray from './dataArray';
import * as Notif from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

const ListOfWorkouts = ({ route, navigation }) => {

    const selectedDay = route.params.selectedDay;

    const [selectedTime, setSelectedTime] = useState('');
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
    navigation.navigate('CreateWorkout', selectedDay);
  };

  // Handles the continue button
  const handleContinuePress = (workout) => {
    // Logic to handle the "Continue" button press
    console.log('Continue Pressed');
    scheduleWorkoutNotif(workout);
    //navigation.navigate('Calendar'); need to add a 
  };

  // Alert function
  const showAlert = ( workout ) => {

    const hour = theBigOne.getHours().toString();
    const min = theBigOne.getMinutes().toString();
    const together = hour.concat(':',min);
    console.log('selectedTime',selectedTime);
    console.log('together',together);
    console.log('theBigOne',theBigOne);

    Alert.alert(
      ('Schedule').concat(' ',workout.name).concat('?'),
      together.concat('\nYou may edit this later.'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Continue', onPress: handleContinuePress(workout) },
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

    <Text style={styles.heading}>Select a workout:</Text>

    <ScrollView>
      {/* Render the list of previously created workouts */}
      {dataArray.map((workout, index) => (
        
        <TouchableOpacity
          key={index}
          style={styles.workoutItem}
          onPress={() => selectWorkout(workout)}
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
