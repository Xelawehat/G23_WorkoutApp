import React, { useState, useRef, forwardRef} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import AuthStyles from '../../Styles/AuthStyles';
import * as Component from '../../Components/Components';
import { login } from '../../api/Authentication';
import { RootState } from '../../StateManagement/store';
import { setUserData } from '../../StateManagement/actions';

const AuthLoginScreen = () =>
{
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [userOrEmail, setUserOrEmail] = useState('');
	const [pass, setPass] = useState('');

	const attemptLogin = async () =>
	{
		try
		{
			const loginResponse = await login({usernameOrEmail: userOrEmail, password: pass});
			const user = (loginResponse.user);
			if (loginResponse.success)
			{
				dispatch(setUserData(loginResponse.user));
				navigation.navigate('HomeTabNavigator'); // Implement successful login actions
			}
			else
			{
				Alert.alert('Login Failed');
			}

		}
		catch (error)
		{
			console.error(error);
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
						/>
						<TouchableOpacity onPress={attemptLogin} style={AuthStyles.loginButton}>
							<Text style={AuthStyles.loginButtonText}>Login</Text>				
						</TouchableOpacity>
						{/*<Button title="Forgot Password?" onPress={forgotPass}/>*/}
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