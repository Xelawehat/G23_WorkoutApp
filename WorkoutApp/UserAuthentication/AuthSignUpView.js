import React, { useState } from 'react';
import {View, TextInput, Button, Alert } from 'react-native';
import AuthViewModel from './AuthViewModel';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from './AuthStyles';
import {PrimaryBackground} from '../BaseComponents/BaseComponents';

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
		<PrimaryBackground>
		<View style={AuthStyles.container}>
			<Button title="Back to login" onPress={returnLogin} />
				<TextInput
					style={AuthStyles.input}
					placeholder="Username"
					value={user}
					onChangeText={setUser}
				/>
				<TextInput
					style={AuthStyles.input}
					placeholder="Password"
					value={pass}
					onChangeText={setPass}
					secureTextEntry={true}
				/>
				<Button title="Sign Up" onPress={attemptSignUp} />
		</View>
		</PrimaryBackground>
	);
};

export default AuthSignUpView;