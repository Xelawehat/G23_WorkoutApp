import axios from 'axios';
import { apiURL } from './APIConfig';

import { IWorkout } from '../Models/workoutModels';

const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
          'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
        },
});

const editWorkout = async (userId: number, workoutData: IWorkout) => {
  try
  {
    const response = await apiClient.patch(`/users/${userId}/workouts`, workoutData);
    console.log(response.data);
    return response.data;
  } 
  catch (error) 
  {
      console.error('Error editing workout:', error);
      throw error;
  }
};

export default editWorkout;