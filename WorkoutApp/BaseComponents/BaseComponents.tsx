import React, {useState} from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import BaseComponentStyle from './BaseComponentStyle'

interface GradientBackgroundProps 
{
  colors?: string[]; // Array of colors for the gradient
  style?: any; // Additional styles for the gradient background
  children?: React.ReactNode; // Optional children components
}

interface PrimaryTextInputProps
{
  placeholder?: string;
  secureTextEntry?: boolean;
}

const PrimaryBackground: React.FC<GradientBackgroundProps> = ({colors = ['#3F51B5','#03A9F4'], style, children }) => {
  return (
    <LinearGradient colors={colors} style={[BaseComponentStyle.primaryBackground, style]}>
      <View style={[BaseComponentStyle.primaryBackgroundMask]}>
      {children}
       </View>
    </LinearGradient>
  );
};

const PrimaryTextInput: React.FC<{placeholder: string}> = ({placeholder, secureTextEntry = false, style}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[BaseComponentStyle.primaryTextInputContainer, {height: isFocused || text ? 60 : 50}, {borderColor: isFocused ? '#FFF' : '#333333'}, style]}>
      <Text style={[BaseComponentStyle.primaryTextInputPlaceholder, isFocused || text ? BaseComponentStyle.primaryTextInputPlaceholderShift : null]}>
        {placeholder}
      </Text>
      <TextInput
        style={BaseComponentStyle.primaryTextInputText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={setText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};



export {PrimaryBackground, PrimaryTextInput};
