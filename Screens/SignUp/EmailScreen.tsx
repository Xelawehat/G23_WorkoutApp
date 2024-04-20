import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';
import { isValidEmail } from '../../Utils/DataVerify';
import { updateSignUpData, resetSignUpData } from '../../StateManagement/actions';

import Styles from '../../Styles/Styles';
import SignUpStyle from '../../Styles/SignUpStyle';

const EmailScreen = () =>
{
	const navigation = useNavigation();

	const signUpData = useSelector((state) => state.signUpData);
	const dispatch = useDispatch();

	const [email, setEmail] = useState(signUpData?.email || '');

	const returnLoginArrow = () => {
		Alert.alert(
			'Do you want to stop creating your account?',
			'If you stop now, you\'ll lose any progress you\'ve made.',
			[
				{
					text: 'Stop creating account',
					onPress: () => {

						dispatch(resetSignUpData());
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

	const nextButton = () =>
	{
		if (isValidEmail(email))
		{
			dispatch(updateSignUpData({ email }));
			navigation.navigate('UsernameScreen');
		}
		else
		{
			Alert.alert('Email is invalid or missing');
		}
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
				<ScrollView contentContainerStyle={Styles.ScrollView} bounces={false}>
					<View style={SignUpStyle.container}>
						<TouchableOpacity onPress={returnLoginArrow}>
							<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
						</TouchableOpacity>
						<SignUpComponent.SignUpInput
							heading="What's your email?"
							subheading={"Enter the email where you can be contacted.\nNo one will see this on your profile."}
							placeholder="Email"
							value={email}
							onChangeText={setEmail}
							style={{
								container: SignUpStyle.input,
								heading: SignUpStyle.heading,
								subheading: SignUpStyle.subheading,
							}}
						/>
						<TouchableOpacity onPress={nextButton} style={SignUpStyle.nextButton}>
							<Text style={SignUpStyle.nextButtonText}>Next</Text>				
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default EmailScreen;