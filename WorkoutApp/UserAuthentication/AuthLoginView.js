import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AuthViewModel from './AuthViewModel';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from './AuthStyles';


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

	return (
		<View style={AuthStyles.container}>
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
			<Button title="Login" onPress={attemptLogin}/>
			<Button title="Forgot Password?"/>
			<Button title="Create new account" onPress={signUp}/>
		</View>
	);
};

export default AuthLoginView;