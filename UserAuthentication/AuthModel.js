import axios from 'axios';

//	Put your IP Address:
let currentIpAddress = '10.32.46.99:5000';

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
	  
			console.log('Data sent successfully:', response.data);
			return true;	//	Maybe turn into a variable for better readability
		  } catch (error) {
			console.error('Error sending data:', error);
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
	  
			console.log('Data sent successfully:', response.data);

			if(response.data.localeCompare("success") == 0){
				return true;
			}
			else{
				return false;
			}
			}
		   catch (error) {
			console.error('Error sending data:', error);
		  }
	}
}

export default AuthModel;