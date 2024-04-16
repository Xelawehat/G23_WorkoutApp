import React, {useRef, useState, useEffect, forwardRef } from 'react';
import { Dimensions } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { TextInput, Text, View, StyleSheet, TextInputProps, TextProps, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Component from './Components';
import ComponentStyle from '../Styles/ComponentStyles';

interface SignUpInputProps
{
	heading?: string;
	subheading?: string;
	placeholder?: string;
	style?:
	{
		container?: ViewStyle;
		heading?: TextStyle;
		subheading?: TextStyle;
		textInputStyle?: TextStyle;
	};
}

interface DatePreview extends TextProps
{
  	heading?: string;
	subheading?: string;
	placeholder?: string;
	date?: Any;
	isFocused?: boolean;
	style?:
	{
		container?: ViewStyle;
		heading?: TextStyle;
		subheading?: TextStyle;
		textStyle?: TextStyle;
	};
}

interface DatePreviewHelper extends TextProps
{
  placeholder?: string;
  date?: Any;
  isFocused?: boolean;
  style?:
  {
    containerStyle?: ViewStyle;
    placeholderStyle?: TextStyle;
    dateStyle?: TextStyle;
  };
}


export const SignUpInput: React.FC<SignUpInputProps> = ({heading, subheading, placeholder, style, onFocusChange, ...props}) => {

	const containerStyle = [ComponentStyle.container, style?.container];
	const headingStyle = [ComponentStyle.signupHeading, style?.heading];
	const subheadingStyle = [ComponentStyle.signupSubheading, style?.subheading];
	const textInputStyle = [style?.textInputStyle];

	return (
		<View style={containerStyle}>
			{heading && <Text style={headingStyle}>
				{heading}
			</Text>}
			{subheading && <Text style={subheadingStyle}>
				{subheading}
			</Text>}
			<Component.PrimaryTextInput
				style={{
					container: ComponentStyle.input,
				}}
				placeholder={placeholder}
				{...props}
			/>
		</View>
	);
};

/*
		Wrapper component to DatePreviewHelper clearns things up and is similar to SignUpInput giving other values for the view

		Has prop onFocus change to link the datetimepicker and the textinput within the datepreview helper. If the textInput within the
		DatePreviewHelper is focused then the datetimepicker will appear. Tap off of datetimepicker and it appears.

		Example is used within '../Views/SignUpViews/AgeView'
*/
export const DatePreview: React.FC<SignUpInputProps> = ({heading, subheading, placeholder, date, style, isFocused, onFocusChange,...props}) => {

	const containerStyle = [ComponentStyle.container, style?.container];
	const headingStyle = [ComponentStyle.signupHeading, style?.heading];
	const subheadingStyle = [ComponentStyle.signupSubheading, style?.subheading];
	const dateStyle = [style?.textInputStyle];


	return (
		<View style={containerStyle}>
			{heading && <Text style={headingStyle}>
				{heading}
			</Text>}
			{subheading && <Text style={subheadingStyle}>
				{subheading}
			</Text>}
			<DatePreviewHelper
				style={{
					container: ComponentStyle.input,
				}}
				placeholder={placeholder}
				date={date}
				isFocused={isFocused}
				onFocusChange={onFocusChange}
				{...props}
			/>
		</View>
	);
};

/*
	Very similar to primary text input however can't edit the input unless through the date picker.
	Date picker must be used on the page of which this is used.
*/
export const DatePreviewHelper: React.FC<SignUpInputProps> = (({ placeholder, date, style, isFocused, onFocusChange, ...props }) => {

  const [focused, setFocused] = useState(isFocused);
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (onFocusChange) {
      ref.current?.focus();
      setFocused(true);
    } else {
      ref.current?.blur();
      setFocused(false);
    }
  }, [onFocusChange]);

  const containerStyle = [ComponentStyle.primaryTextInputContainer, {height: 60}, {borderColor: isFocused ? '#FFF' : '#333333'}, style];
  const placeholderStyle = [ComponentStyle.primaryTextInputPlaceholderShift];
  const dateStyle = [ComponentStyle.primaryTextInputText];
  return (
      <View style={containerStyle}>
        <Text style={placeholderStyle}>
        	{placeholder}
        </Text>
        <TextInput
        	inputMode="none"
        	caretHidden={true}
        	placeholder={date ? date.toString() : ''}
        	style={dateStyle} 
        	ref={ref}
        	{...props}
        />
      </View>
  );
}
);
