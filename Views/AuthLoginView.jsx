import React, { useState, useRef, forwardRef} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthViewModel from '../UserAuthentication/AuthViewModel';
import AuthStyles from '../Styles/AuthStyles';
import * as Component from '../Components/Components';

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
			navigation.navigate(`Home`);
			console.log('Logging in');
			console.log('User', user);
			console.log('Pass', pass);
		}
		else
		{
			Alert.alert('Login Failed');
		}

	};

	const sendToSignUp = () => 
	{
		navigation.navigate('SignUpStack')
	}

	const forgotPass = () =>
	{
		Alert.alert('Uh oh Forgot my password... do stuff');
	}

	return (
		<Component.PrimaryBackground>
			<View style={AuthStyles.container}>
				<Component.PrimaryTextInput
					style={AuthStyles.input}
					placeholder="Username, email, or mobile number"
					placeholderTextColor='#FFF'
					value={user}
					onChangeText={setUser}
					selectionColor='#FFF'
				/>
				<Component.PrimaryTextInput
					style={AuthStyles.input}
					placeholder="Password"
					placeholderTextColor='#FFF'
					value={pass}
					onChangeText={setPass}
					secureTextEntry={true}
					selectionColor={'#FFF'}
					returnKeyType="done"
					onSubmitEditing={attemptLogin}
				/>
				<TouchableOpacity onPress={attemptLogin} style={AuthStyles.loginButton}>
					<Text style={AuthStyles.loginButtonText}>Login</Text>				
				</TouchableOpacity>
				<Button title="Forgot Password?" onPress={forgotPass}/>
			</View>
			<View style={AuthStyles.createAccountContainer}>
				<TouchableOpacity onPress={sendToSignUp} style={AuthStyles.createAccountButton}>
						<Text style={AuthStyles.createAccountButtonText}>Create new account</Text>				
				</TouchableOpacity>
			</View>
		</Component.PrimaryBackground>
	);
};

export default AuthLoginView;