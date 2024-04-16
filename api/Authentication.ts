import axios from 'axios';

const apiClient = axios.create({

});

export const signup = async (userData) => {

	try
	{
		const response = await apiClient.post('/signup', userData);
		return response.data;
	}
	catch (error)
	{
		throw error;
	}
};