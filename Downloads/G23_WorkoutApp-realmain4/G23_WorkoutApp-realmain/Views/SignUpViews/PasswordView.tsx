import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';
import { isValidPassword } from '../../Utils/DataVerify';

import Styles from '../../Styles/Styles';
import SignUpStyle from '../../Styles/SignUpStyle';

const PasswordView = ({ route }) =>
{
	const navigation = useNavigation();
	const [password, setPassword] = useState('');
	const { email, username } = route.params;

	const backArrow = () => {
		navigation.navigate('UsernameView');
	};

	// Checks that password is valid if not shows user why not
	const nextButton = async () =>
	{
		let isPasswordValid = isValidPassword(password)

		//	TEST if variables persist
		// console.log(email);
		// console.log(username);
		// console.log(password);
		if (isPasswordValid.isValid)
		{
			//navigation.navigate('AgeView')
			//	Attempt the login
			const signup = await AuthViewModel.createUser(email, username, password);

			//	If successful
			if (signup)
				{
					Alert.alert(`Welcome ${username}`);
					console.log('Logging in');
					console.log('Email', email);
					console.log('User', username);
					console.log('Pass', password);
					navigation.navigate(`Home`);
				}
				else
				{
					Alert.alert('Login Failed');
				}

			Alert.alert(`Account creation successful.`);
			navigation.navigate(`Home`);
			
		}
		else
		{
			Alert.alert(`${isPasswordValid.reason}`);
		}
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
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
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default PasswordView;