import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//	Put your IP Address:
let currentIpAddress = '172.20.10.11:5000';

// Handles business logic of user authentication
class AuthModel
{
	/*
		Authentication logic send request verify login credentials
		Return true if success, false otherwise
	*/
	static async loginUser(user, pass)
	{
		try {
	  
			//  Method 2 - Send user data to the MongoDB database
			//	To test on your phone: should be: url: 'http://your_public_ip:5000/login'; (Windows open the cmd terminal, enter "ipconfig", use the ipv4 address)
			//	To test on emulator: use url: 'http://10.0.2.2:5000/login' if you're using an emulator (or maybe 10.0.0.2);
			const response = await axios({
			  method: 'post',
			  url: `http://${currentIpAddress}/login`,
			  data: {
				username: user,
				password: pass,
			  }
			});
	  
			// console.log('Data sent successfully:', response.data);
			// return true;	//	Maybe turn into a variable for better readability
			if(response.data.message == "success"){
				// Save userId
				console.log('Data sent successfully:', response.data);
				AsyncStorage.setItem('userId', response.data.userId);
				console.log("User session saved");
				return true;
			}
			else{
				return false;
			}
		  } catch (error) {
			console.error('Error sending data:', error);
			return false;
		  }
	 }

	/* 
		Creating account
		Return true if success, false otherwise
	*/
	static async createUser(email, user, pass)
	{
		try {
	  
			//  Method 2 - Send user data to the MongoDB database
			const response = await axios({
			  method: 'post',
			  url: `http://${currentIpAddress}/register`,
			  data: {
				email: email,
				username: user,
				password: pass,	//	Did this to test this function, since server.js expects username & password with a post request
			  }
			});
	  
			// console.log('Data sent successfully:', response.data);

			// if(response.data.localeCompare("success") == 0){
			// 	return true;
			// }
			// else{
			// 	return false;
			// }
			if(response.data.message == "success"){
				// Save userId
				console.log('Data sent successfully:', response.data);
				AsyncStorage.setItem('userId', response.data.userId);
				return true;
			}
			else{
				return false;
			}
			}
		   catch (error) {
			console.error('Error sending data:', error);
			return false;
		  }
	}
}

export default AuthModel;