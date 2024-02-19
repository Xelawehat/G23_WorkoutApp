import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthViewModel from './AuthViewModel';
import AuthStyles from './AuthStyles';
import {PrimaryBackground, PrimaryTextInput} from '../BaseComponents/BaseComponents';


const AuthLoginView = () =>
{
	const navigation = useNavigation();

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');


	const attemptLogin = async () =>
	{
		const attempt = await AuthViewModel.login(user, pass);

		if (attempt)
		{
			Alert.alert('Login successful');
		}
		else
		{
			Alert.alert('Login Failed');
		}

	};

	const signUp = () => 
	{
		navigation.navigate('SignUp')
	}

	const forgotPass = () =>
	{
		Alert.alert('Uh oh Forgot my password... do stuff');
	}

	return (
		<PrimaryBackground>
		<View style={AuthStyles.container}>
			<PrimaryTextInput
				style={AuthStyles.input}
				placeholder="Username, email, or mobile"
				placeholderTextColor='#FFF'
				value={user}
				onChangeText={setUser}
				cursorColor="#FFF"
			/>
			<PrimaryTextInput
				style={AuthStyles.input}
				placeholder="Password"
				placeholderTextColor='#FFF'
				value={pass}
				onChangeText={setPass}
				secureTextEntry={true}
				cursorColor="#FFF"
			/>
			<TouchableOpacity
				onPress={attemptLogin}
				style={AuthStyles.loginButton}
			>
				<Text
				style={AuthStyles.loginButtonText}
				>
				Login
				</Text>				
			</TouchableOpacity>
			<Button 
				title="Forgot Password?" 
				onPress={forgotPass}
			/>
			<TouchableOpacity
				onPress={signUp}
				style={AuthStyles.createAccountButton}
			>
				<Text
				style={AuthStyles.createAccountButtonText}
				>
				Create new account
				</Text>				
			</TouchableOpacity>
		</View>
		</PrimaryBackground>
	);
};

export default AuthLoginView;