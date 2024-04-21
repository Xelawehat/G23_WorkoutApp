import React, {useRef, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { TextInput, Text, View, StyleSheet, TextInputProps, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import ComponentStyle from '../Styles/ComponentStyles';
import { COLOR } from '../Styles/Colors';


/*
  Typescript requires that components have interfaces for type safety
  and to get a better view of what props are allowed
*/
interface GradientBackgroundProps 
{
  colors?: string[]; // Array of colors for the gradient
  style?: any; // Additional styles for the gradient background
  children?: React.ReactNode; // Optional children components
}

interface PrimaryTextInputProps extends TextInputProps
{
  placeholder?: string;
  style?:
  {
    containerStyle?: ViewStyle;
    placeholderStyle?: TextStyle;
    inputStyle?: TextStyle;
  };
  onChangeText?: (text: string) => void;

}

/*
    Component that sets the background when used
*/
export const PrimaryBackground: React.FC<GradientBackgroundProps> = ({colors = COLOR.gradientColors, style, children }) => {
  return (
    <LinearGradient colors={colors} style={[ComponentStyle.primaryBackground, style]}>
      <View style={[ComponentStyle.primaryBackgroundMask]}>
      {children}
       </View>
    </LinearGradient>
  );
};

/*
    Custom text input component

    -- Note: Must set the value in order for animation to work
*/
export const PrimaryTextInput: React.FC<PrimaryTextInputProps> = ({placeholder, style, value, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(Boolean(value));

  useEffect(() => {
    setHasText(Boolean(value));
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const containerStyle = [ComponentStyle.primaryTextInputContainer, {height: (isFocused || hasText) ? 60 : 50}, {borderColor: isFocused ? '#FFF' : '#333333'}, style];
  const placeholderStyle = [ComponentStyle.primaryTextInputPlaceholder, (isFocused || hasText) ? ComponentStyle.primaryTextInputPlaceholderShift : null];
  const inputStyle = [ComponentStyle.primaryTextInputText];

  return (
    <View style={containerStyle}>
      <Text style={placeholderStyle}>
        {placeholder}
      </Text>
      <TextInput
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={props.onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};