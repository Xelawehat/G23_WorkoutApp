import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import retrieveWorkouts from '../api/retrieveWorkouts';

const WorkoutsInformation = () => {
  const [workoutsArray, setWorkoutsArray] = useState([]);

  const userData = useSelector((state) => state.userData);

  useEffect(() => {

    const userId = userData._id;
    // Get the workouts from the database
    const getUserWorkouts = async () => {
    try 
    {
        const response = await retrieveWorkouts(userId);

         console.log(response.workouts);
        // Format the data so that [Object] isn't being passed; seems to mess up the Marked dates
        const formattedWorkouts = response.workouts.map(workout => ({
          ...workout,
          date: workout.date && typeof workout.date === 'string' ? workout.date.split('T')[0] : workout.date
        }));

        setWorkoutsArray(formattedWorkouts);
        console.log('Formatted workouts:',formattedWorkouts);

      } 
      catch (error) 
      {
        console.error('Error fetching workouts:', error);
      }
    };

    getUserWorkouts();
  }, []);

  return workoutsArray; // Or return something meaningful based on your logic
};

export default WorkoutsInformation;