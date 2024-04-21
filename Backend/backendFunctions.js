const axios = require('axios');
const AsyncStorage = require("@react-native-async-storage/async-storage");

const getterUserWorkouts = async () => {
    const userId = await AsyncStorage.getItem('userId');
    let currentIpAddress = '172.20.10.11:5000';

    try {
        const response = await axios({
            method: 'get',
            url: `http://${currentIpAddress}/users/${userId}/workouts`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting workout:', error.response.data);
    }
};

module.exports = getterUserWorkouts;