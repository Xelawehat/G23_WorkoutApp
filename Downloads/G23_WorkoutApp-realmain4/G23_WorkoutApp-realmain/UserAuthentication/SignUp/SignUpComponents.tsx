import React, {useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { TextInput, Text, View, StyleSheet, TextInputProps} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as BC from '../../BaseComponents/BaseComponents';
import SignUpStyle from './SignUpStyle';

interface SignUpInputProps
{
	heading?: string;
	subheading?: string;
	placeholder?: string;
	style?:
	{

	};
}

export const SignUpInput: React.FC<{heading: string, subheading: string, placeholder: string}> = ({heading, subheading, placeholder, style, ...props}) => {

	const containerStyle = [SignUpStyle.container];
	const headingStyle = [SignUpStyle.heading];
	const subheadingStyle = [SignUpStyle.subheading];

	return (
		<View style={containerStyle}>
			{heading && <Text style={headingStyle}>
				{heading}
			</Text>}
			{subheading && <Text style={subheadingStyle}>
				{subheading}
			</Text>}
			<BC.PrimaryTextInput
				placeholder={placeholder}
				{...props}
			/>
		</View>
	);
};
