import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";


const getterUserWorkouts = async () => {
    const userId = await AsyncStorage.getItem('userId');

    try {
              const response = await axios({
                method: 'get',
                url: `http://${currentIpAddress}/users/${userId}/workouts`,
          headers: {
            'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
          },
                // data:workoutData
              });
        
              console.log('Response:', response.data);
              return response.data;
            } catch (error) {
              console.error('Error getting workout:', error.response.data);
            };
};

export default getterUserWorkouts;