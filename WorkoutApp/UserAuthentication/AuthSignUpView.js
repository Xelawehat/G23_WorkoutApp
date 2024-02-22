import React, { useState } from 'react';
import {View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthViewModel from './AuthViewModel';
import AuthStyles from './AuthStyles';
import * as BC from '../BaseComponents/BaseComponents';
import * as SUC from './SignUp/SignUpComponents';

const AuthSignUpView = () =>
{
	const navigation = useNavigation();

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

	const attemptSignUp = async () =>
	{
		const attempt = await AuthViewModel.createUser(user, pass);

		if (attempt)
		{
			Alert.alert('Account successfully created');
		}
		else
		{
			Alert.alert('Failed to create account');
		}
	};

	const returnLogin = () =>
	{
		Alert.alert(
			'Do you want to stop creating your account?',
			'If you stop now, you\'ll lose any progress you\'ve made.',
			[
				{
					text: 'Stop creating account',
					onPress: () => 
					{
						navigation.navigate('Login');
						console.log('Stopped account creation going back to login')
					}
				},
				{
					text: 'Continue creating account',
					onPress: () => console.log('Continued account creation')
				}
			]
		)
	}

	return (
		<BC.PrimaryBackground>
			<View style={AuthStyles.signUpContainer}>
				<SUC.SignUpInput
					heading="What's your mobile number?"
					subheading={"Enter the mobile number where you can be contacted.\nNo one will see this on your profile."}
					placeholder="Mobile number"
					value={user}
					onChangeText={setUser}
					keyboardType="phone-pad"
				/>
				<TouchableOpacity onPress={returnLogin}>
					<Icon name="arrow-back-ios" size={30} color="#FFF" style={AuthStyles.backArrow}/>
				</TouchableOpacity>
			<Button title="Sign Up" onPress={attemptSignUp} />
			<Button title="Back to login" onPress={returnLogin} />
			</View>
		</BC.PrimaryBackground>
	);
};

export default AuthSignUpView;