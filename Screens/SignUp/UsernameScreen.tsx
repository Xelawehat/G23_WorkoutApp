import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';
import { isValidUsername } from '../../Utils/DataVerify';

import Styles from '../../Styles/Styles';
import SignUpStyle from '../../Styles/SignUpStyle';

const UsernameScreen = ({navigation, route }) => {
	const { SignUpData } = route.params;

	const [username, setUsername] = useState('');

	const backArrow = () => {
		navigation.navigate('EmailScreen');
	};

	const nextButton = () =>
	{
		if (isValidUsername(username))
		{
			const updatedSignUpData = { ...SignUpData, username };
			navigation.navigate('PasswordScreen', { SignUpData: updatedSignUpData });
		}
		else
		{
			Alert.alert('Username is taken or missing');
		}
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
				<ScrollView contentContainerStyle={Styles.ScrollView} bounces={false}>
					<View style={SignUpStyle.container}>
						<TouchableOpacity onPress={backArrow}>
							<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
						</TouchableOpacity>
						<SignUpComponent.SignUpInput
							heading="What's your username?"
							subheading={"Don't worry you can change this, and this is unique to you"}
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
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

export default UsernameScreen;