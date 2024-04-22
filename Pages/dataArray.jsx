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




// // // workoutData.js
// const workoutsArray = [
//   {
//       name: "Leg Day",
//       color: "blue",
//       date: "2024-04-20",
//       time: "2024-04-20T16:25",
//       timesCompleted: 0,
//       exercises: [
//         {
//           name: "Deadlifts",
//           sets: 3,
//           reps: 5,
//           weight: 315
//         },
//         {
//           name: "Squats",
//           sets: 3,
//           reps: 5,
//           weight: 50
//         },
//         // Add more exercises if needed
//       ]
//     },
//     {
//       name: "Chest Day",
//       color: "red",
//       date: "2024-04-20",
//       time: "2024-04-20T16:25",
//       timesCompleted: 0,
//       exercises: [
//         {
//           name: "Bench Press",
//           sets: 3,
//           reps: 5,
//           weight: 225
//         },
//         {
//           name: "Tricep Pulldown",
//           sets: 3,
//           reps: 10,
//           weight: 65
//         },
//         {
//           name: "Push-Ups",
//           sets: 3,
//           reps: 20,
//           weight: 0
//         },
//         // Add more exercises if needed
//       ]
//     },
// ];

// export default workoutsArray;