import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AuthViewModel from './AuthViewModel';
import { useNavigation } from '@react-navigation/native';


const AuthLoginView = () =>
{
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
			<Button title="Login" onPress={attemptLogin} />
			<Button title="Sign Up" onPress={signUp}/>
		</View>
	);
};

export default AuthLoginView;