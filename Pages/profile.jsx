import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
//  Added
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let currentIpAddress = '192.168.12.212:5000';

export default function Profile({ navigation }) {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [profileData, setProfileData] = useState({
    age: '',
    height: '',
    weight: '',
    gender:'',
    goals:'',
    experience:''
  });

  const age = {
    label: 'Select an option...',
    value: null,
  };
  const height = {
    label: 'Select an option...',
    value: null
  };
  const weight = {
    label: 'Select an option...',
    value: null
  };
  const gender = {
    label: 'Select an option...',
    value: null
  };
  const goal = {
    label: 'Select an option...',
    value: null
  };
  const experience = {
    label: 'Select an option...',
    value: null
  };

  const ages = [
    { label: 'Under 18', value: 'Under 18' },
    { label: '18-24', value: '18-24' },
    { label: '25-34', value: '25-34' },
    { label: '35-44', value: '35-44' },
    { label: '45-54', value: '45-54' },
    { label: '55-64', value: '55-64' },
    { label: '65-74', value: '65-74' },
    { label: 'Over 75', value: 'Over 75' },
  ];

  const heights = [
    {label: `Under 4'`, value: `Under 4'"`},
    {label: `4'0"-4'5"`, value: `4'0"-4'5"'`},
    {label: `4'6"-4'11"`, value: `4'6"-4'11"`},
    {label: `5'0"-5'5"`, value: `5'0"-5'5"`},
    {label: `5'6"-5'11"`, value: `5'6"-5'11"`},
    {label: `6'0"-6'5"`, value: `6'0"-6'5"`},
    {label: `6'6"-6'11"`, value: `6'6"-6'11"`},
    {label: `Over 7'`, value: `Over 7'`},
  ];
  const weights = [
    {label: 'Under 100', value: 'Under 100'},
    {label: '100-124', value: '100-124'},
    {label: '125-149', value: '125-149'},
    {label: '150-174', value: '150-174'},
    {label: '175-199', value: '175-199'},
    {label: '200-224', value: '200-224'},
    {label: '225-249', value: '225-249'},
    {label: '250-274', value: '250-274'},
    {label: '275-299', value: '275-299'},
    {label: 'Over 300', value: 'Over 300'},
  ];
  const genders = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  const goals = [
    {label: 'Bulk (Gain weight)', value: 'Bulk (Gain weight)'},
    {label: 'Cut (Loose weight)', value: 'Cut (Loose weight)'},
    {label: 'Maintain', value: 'Maintain'},
  ];
  const experiences = [
    {label: 'Beginner (Under 2 years)', value: 'Beginner (Under 2 years)'},
    {label: 'Intermediate (2-5 years)', value: 'Intermediate (2-4 years)'},
    {label: 'Advanced (Over 5 years)', value: 'Advanced (Over 5 years)'},
  ];

  const handleSaveProfile = () =>{
    const userProfileData = {
      age: selectedAge,
      height: selectedHeight,
      weight: selectedWeight,
      gender: selectedGender,
      goals: selectedGoal,
      experience: selectedExperience
    };
    updateUserProfile(userProfileData);
    alert("Profile saved");
  };

  //  Function to update the user profile
  const updateUserProfile = async (userProfileData) => {
    try {
      const userId = await AsyncStorage.getItem(`userId`);
      // const response = await axios.patch(`${currentIpAddress}/users/${userId}/profile`, userProfileData);

      const response = await axios({
			  method: 'patch',
			  url: `http://${currentIpAddress}/users/${userId}/profile`,
        headers: {
          'Content-Type': 'application/json'  //  tells the server to expect JSON content so it can be parsed
        },
			  data:userProfileData
			});

      console.log("Profile updated successfully: ", response.data);
      alert("Profile updated successfully: ", response.data);
      // return response.data;
    }  catch (error) {
			console.error('Failed to update profile:', error.response.data);
		  }
  };

  return (
    <View>
      <ScrollView>
        <Text style={ styles.dropdownName }>Age:</Text>
        <RNPickerSelect 
          placeholder={age}
          items={ages}
          onValueChange={(value) => setSelectedAge(value)}
          value={selectedAge}
          style={ pickerSelectStyles }
        />
        {selectedAge && <Text style={ styles.selected }>Selected: {selectedAge}</Text>}

        <Text style={ styles.dropdownName }>Height: </Text>
        <RNPickerSelect
          placeholder={height}
          items={heights}
          onValueChange={(value) => setSelectedHeight(value)}
          value={selectedHeight}
          style={ pickerSelectStyles }
        />
        {selectedHeight && <Text style={ styles.selected }>Selected: {selectedHeight}</Text>}

        <Text style={ styles.dropdownName }>Weight: </Text>
        <RNPickerSelect
          placeholder={weight}
          items={weights}
          onValueChange={(value) => setSelectedWeight(value)}
          value={selectedWeight}
          style={ pickerSelectStyles }
        />
        {selectedWeight && <Text style={ styles.selected }>Selected: {selectedWeight}</Text>}

        <Text style={ styles.dropdownName }>Gender: </Text>
        <RNPickerSelect
          placeholder={gender}
          items={genders}
          onValueChange={(value) => setSelectedGender(value)}
          value={selectedGender}
          style={ pickerSelectStyles }
        />
        {selectedGender && <Text style={ styles.selected }>Selected: {selectedGender}</Text>}

        <Text style={ styles.dropdownName }>Goals: </Text>
        <RNPickerSelect
          placeholder={goal}
          items={goals}
          onValueChange={(value) => setSelectedGoal(value)}
          value={selectedGoal}
          style={ pickerSelectStyles }
        />
        {selectedGoal && <Text style={ styles.selected }>Selected: {selectedGoal}</Text>}


        <Text style={ styles.dropdownName }>Experience: </Text>
        <RNPickerSelect
          placeholder={experience}
          items={experiences}
          onValueChange={(value) => setSelectedExperience(value)}
          value={selectedExperience}
          style={ pickerSelectStyles }
        />
        {selectedExperience && <Text style={ styles.selected }>Selected: {selectedExperience}</Text>}

        <View style={styles.button}>
          <TouchableOpacity
          onPress={handleSaveProfile}
          style={styles.saveButton}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: '700',
      paddingLeft: '37.5%'
    },
    dropdown: {
      paddingTop: '15%',
      flex: 1,
    },
    settingsButton: {
      paddingRight: '60%',
      paddingBottom: '5%',
    },
    dropdownName: {
      fontSize: 22,
      fontWeight: '500',
      paddingTop: '2.5%',
      paddingBottom: '2.5%',
      paddingLeft: '5%',
      backgroundColor: 'white'
    },
    selected: {
      paddingLeft: '10%',
      paddingBottom: '2.5%',
      fontSize: 16
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingRight: '1%',
      height: 50,
      width: 100,
    },
    rowLabel: {
      fontSize: 18,
      fontWeight: '500',
    },
    button: {
      paddingTop: '25%',
      paddingLeft: '30%'
    },
    saveButton: {
      height: 50,
      width: 150,
      borderWidth: 2,
      borderColor: 'green',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 20,
      color: 'green'
    }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingTop: '2.5%',
    paddingLeft: '10%',
    paddingBottom: '1%',
    fontSize: 16
  },
})