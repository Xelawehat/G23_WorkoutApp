import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../Components/Components';
import * as SignUpComponent from '../Components/SignUpComponents';

import AuthViewModel from '../UserAuthentication/AuthViewModel';
import AuthStyles from '../Styles/AuthStyles';
import SignUpStyle from '../Styles/SignUpStyle';

const AuthSignUpScreen = () =>
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

	const returnLoginArrow = () => {
		Alert.alert(
			'Do you want to stop creating your account?',
			'If you stop now, you\'ll lose any progress you\'ve made.',
			[
				{
					text: 'Stop creating account',
					onPress: () => {
						navigation.navigate('Login');
						console.log('Stopped account creation going back to login');
					}
				},
				{
					text: 'Continue creating account',
					onPress: () => console.log('Continued account creation')
				}
			]
		)

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
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={AuthStyles.safeZone}>
				<View style={SignUpStyle.container}>
					<TouchableOpacity onPress={returnLoginArrow}>
						<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
					</TouchableOpacity>
					<SignUpComponent.SignUpInput
						heading="What's your mobile number?"
						subheading={"Enter the mobile number where you can be contacted.\nNo one will see this on your profile."}
						placeholder="Mobile number"
						value={user}
						onChangeText={setUser}
						keyboardType="phone-pad"
						style={{
							container: SignUpStyle.input,
							heading: SignUpStyle.heading,
							subheading: SignUpStyle.subheading,
						}}
					/>
				</View>
				<TouchableOpacity style={SignUpStyle.alreadyHaveContainer}>
					<Text onPress={returnLogin} style={SignUpStyle.alreadyHaveText}>Already have an account?</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default AuthSignUpScreen;