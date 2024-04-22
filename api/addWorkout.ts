import axios from 'axios';
import { apiURL } from './APIConfig';

const apiClient = axios.create({
	baseURL: apiURL,
});

const addWorkout = async (workoutData: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}/workouts`);
    console.log(response.data);
    return response.data;
  } 
  catch (error) 
  {
  		console.error('Signup error:', error);
    	throw error;
  }
};

export default addWorkout;
