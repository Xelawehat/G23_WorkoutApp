import axios from 'axios';
import { apiURL } from './APIConfig';
import { setUserData } from '../StateManagement/actions';

const apiClient = axios.create({
	baseURL: apiURL,
	headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (signUpData) => {
  try {
    const response = await apiClient.post('/signup', signUpData);
    console.log(response.data);
    return response.data;
  } 
  catch (error) 
  {
  		console.error('Signup error:', error);
    	throw error;
  }
};

export const login = async (loginData) => {

	try {
		const response = await apiClient.post('/login', loginData);
		console.log(response.data);
		return response.data;
	}
	catch (error)
	{
		console.error('Login error:', error);
		throw error;
	}
};
