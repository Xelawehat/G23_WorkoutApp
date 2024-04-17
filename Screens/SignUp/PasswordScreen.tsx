import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';
import { isValidPassword } from '../../Utils/DataVerify';

import Styles from '../../Styles/Styles';
import SignUpStyle from '../../Styles/SignUpStyle';

const PasswordScreen = ({ navigation, route }) =>
{
	const { SignUpData } = route.params;

	const [password, setPassword] = useState('');

	const backArrow = () => {
		navigation.navigate('UsernameScreen');
	};

	// Checks that password is valid if not shows user why not
	const nextButton = () =>
	{
		let isPasswordValid = isValidPassword(password)
		if (isPasswordValid.isValid)
		{	
			const updatedSignUpData = { ...SignUpData, password };
			navigation.navigate('AgeScreen', { SignUpData: updatedSignUpData });
		}
		else
		{
			Alert.alert(`${isPasswordValid.reason}`);
		}
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
				<ScrollView contentContainerStyle={Styles.ScrollView} bounces={false}>
					<View style={SignUpStyle.container}>
						<TouchableOpacity onPress={backArrow}>
							<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
						</TouchableOpacity>
						<SignUpComponent.SignUpInput
							heading="Good Password?"
							subheading={"Try and pick something secure...\nyour data matters."}
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={true}
							style={{
								container: SignUpStyle.input,
								heading: SignUpStyle.heading,
								subheading: SignUpStyle.subheading,
							}}
						/>
						<TouchableOpacity onPress={nextButton} style={SignUpStyle.nextButton}>
							<Text style={SignUpStyle.nextButtonText}>Next</Text>				
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default PasswordScreen;