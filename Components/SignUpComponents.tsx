import React, {useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { TextInput, Text, View, StyleSheet, TextInputProps} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

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

export const SignUpInput: React.FC<SignUpInputProps> = ({heading, subheading, placeholder, style, ...props}) => {

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
