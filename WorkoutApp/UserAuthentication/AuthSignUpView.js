import React, { useState } from 'react';
import {View, TextInput, Button, Alert } from 'react-native';
import AuthViewModel from './AuthViewModel';
import { useNavigation } from '@react-navigation/native';

const AuthSignUpView = () =>
{
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

	return (
		<View>
			<TextInput
				placeholder="Username"
				value={user}
				onChangeText={setUser}
			/>
			<TextInput
				placeholder="Password"
				value={pass}
				onChangeText={setPass}
				secureTextEntry={true}
			/>
			<Button title="Sign Up" onPress={attemptSignUp} />
		</View>
	);
};

export default AuthSignUpView;