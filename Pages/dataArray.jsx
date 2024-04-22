import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let currentIpAddress = '172.20.10.11:5000';

const WorkoutsInformation = () => {
  const [workoutsArray, setWorkoutsArray] = useState([]);

  useEffect(() => {
    // Get the workouts from the database
    const getUserWorkouts = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId);
        if (!userId) {
          console.log('User ID is null, check AsyncStorage setup');
          return;
        }

        const response = await axios.get(`http://${currentIpAddress}/users/${userId}/workouts`);

        // Format the data so that [Object] isn't being passed; seems to mess up the Marked dates
        const formattedWorkouts = response.data.map(workout => ({
          ...workout,
          date: workout.date.split('T')[0]
        }));

        setWorkoutsArray(formattedWorkouts);
        console.log('Formatted workouts:',formattedWorkouts);

      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    getUserWorkouts();
  }, []);

  return workoutsArray; // Or return something meaningful based on your logic
};

export default WorkoutsInformation;