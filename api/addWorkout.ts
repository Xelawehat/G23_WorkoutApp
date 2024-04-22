import axios from 'axios';
import { apiURL } from './APIConfig';

import { IWorkout } from '../Models/workoutModel';

const apiClient = axios.create({
	baseURL: apiURL,
  headers: {
          'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
        },
});

const addWorkout = async (userId: number, workoutData: IWorkout) => {
  try {
    const response = await apiClient.post(`/users/${userId}/workouts`, workoutData);
    console.log(response.data);
    return response.data;
  } 
  catch (error) 
  {
  		console.error('Error adding workout:', error);
    	throw error;
  }
};

export default addWorkout;
