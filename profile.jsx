import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';

const Dropdown = () => {
  //Want to create one useState that has all of these properties within it
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

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

  //Use these values for initial setup, going to change to have regular values
  const ages = [
    { label: '0-10', value: '0-10' },
    { label: '11-20', value: '11-20' },
    { label: '21-30', value: '21-30' },
    { label: '31-40', value: '31-40' },
    { label: '41-50', value: '41-50' },
    { label: '51-60', value: '51-60' },
    { label: '61-70', value: '61-70' },
    { label: '71+', value: '71+' },
  ];
  const heights = [
    {label: `3'0"-3'11"`, value: `3'0"-3'11"`},
    {label: `4'0"-4'11'`, value: `4'0"-4'11'`},
    {label: `5'0"-5'11"`, value: `5'0"-5'11"`},
    {label: `6'0"-6'11"`, value: `6'0"-6'11"`},
    {label: `7'+`, value: `7'+`},
  ];
  const weights = [
    {label: '100-125', value: '100-125'},
    {label: '126-150', value: '126-150'},
    {label: '151-175', value: '151-175'},
    {label: '176-200', value: '176-200'},
    {label: '201-225', value: '201-225'},
    {label: '226-250', value: '226-250'},
    {label: '251-275', value: '251-275'},
    {label: '276-300', value: '276-300'},
    {label: '300+', value: '300+'},
  ];
  const genders = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  const goals = [
    {label: 'Bulk (gain weight)', value: 'Bulk (gain weight)'},
    {label: 'Cut (loose weight)', value: 'Cut (loose weight)'},
    {label: 'Maintain', value: 'Maintain'},
  ];
  const experiences = [
    {label: 'Beginner', value: 'Beginner'},
    {label: 'Intermediate', value: 'Intermediate'},
    {label: 'Advanced', value: 'Advanced'},
  ];

  return (
    <View style={ styles.dropdown }>
    
      <Text>Age:</Text>
      <RNPickerSelect 
        placeholder={age}
        items={ages}
        onValueChange={(value) => setSelectedAge(value)}
        value={selectedAge}
      />
      {selectedAge && <Text>Selected: {selectedAge}</Text>}

      {/*May want to make 2 dropdowns next to each other one for feet, one for inches */}
      <Text>Height: </Text>
      <RNPickerSelect
        placeholder={height}
        items={heights}
        onValueChange={(value) => setSelectedHeight(value)}
        value={selectedHeight}
      />
      {selectedHeight && <Text>Selected: {selectedHeight}</Text>}

      <Text>Weight: </Text>
      <RNPickerSelect
        placeholder={weight}
        items={weights}
        onValueChange={(value) => setSelectedWeight(value)}
        value={selectedWeight}
      />
      {selectedWeight && <Text>Selected: {selectedWeight}</Text>}

      <Text>Gender: </Text>
      <RNPickerSelect
        placeholder={gender}
        items={genders}
        onValueChange={(value) => setSelectedGender(value)}
        value={selectedGender}
      />
      {selectedGender && <Text>Selected: {selectedGender}</Text>}

      <Text>Goals: </Text>
      <RNPickerSelect
        placeholder={goal}
        items={goals}
        onValueChange={(value) => setSelectedGoal(value)}
        value={selectedGoal}
      />
      {selectedGoal && <Text>Selected: {selectedGoal}</Text>}


      <Text>Experience: </Text>
      <RNPickerSelect
        placeholder={experience}
        items={experiences}
        onValueChange={(value) => setSelectedExperience(value)}
        value={selectedExperience}
      />
      {selectedExperience && <Text>Selected: {selectedExperience}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    dropdown: {
        paddingTop: '15%',
        paddingLeft: '10%'
    }
})

export default Dropdown;
