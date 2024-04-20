// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// let currentIpAddress = `192.168.12.212:5000`;
// const getUserWorkouts = async () => {

//     const userId = await AsyncStorage.getItem('userId');

//     if(!userId){
//         console.error('No user ID available');
//         return;
//     }

//     try {
	
// 			const response = await axios({
// 			  method: 'get',
// 			  url: `http://${currentIpAddress}/users/${userId}/workouts`,
//         headers: {
//           'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
//         },
//         withCredentials:true
// 			});

// 			console.log('Workouts:', response.data);
//             return response.data;

//       // console.log('Workout saved:', { workoutData, selectedExercises });
//     //   alert('Workout Saved');
// 		  } catch (error) {
// 			console.error('Error getting workout:', error.response.data);
// 		  }
//   }

//   export default getUserWorkouts;