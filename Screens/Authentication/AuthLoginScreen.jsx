import React, { useState, useRef, forwardRef} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthStyles from '../../Styles/AuthStyles';
import * as Component from '../../Components/Components';
import { login } from '../../api/Authentication';

const AuthLoginScreen = () =>
{
	const navigation = useNavigation();

	const [userOrEmail, setUserOrEmail] = useState('');
	const [pass, setPass] = useState('');

	const attemptLogin = async () =>
	{
		const loginResponse = await login({usernameOrEmail: userOrEmail, password: pass});
		const user = (loginResponse.user);
		console.log(loginResponse);
		if (loginResponse.success)
		{
			// Implement successful login actions
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
			<SafeAreaView style={AuthStyles.safeZone}>
				<ScrollView contentContainerStyle={AuthStyles.ScrollView} bounces={false}>
					<View style={AuthStyles.container}>
						<Component.PrimaryTextInput
							style={AuthStyles.input}
							placeholder="Username or Email"
							placeholderTextColor='#FFF'
							value={userOrEmail}
							onChangeText={setUserOrEmail}
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
				</ScrollView>
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default AuthLoginScreen;