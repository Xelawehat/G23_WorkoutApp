import React, { useState, useEffect } from 'react';
import { SafeAreaView, View,TextInput,Button,Alert,TouchableOpacity,Pressable,Text,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';
import { isValidDate } from '../../Utils/DataVerify';

import Styles from '../../Styles/Styles';
import ComponentStyle from '../../Styles/ComponentStyles';
import SignUpStyle from '../../Styles/SignUpStyle';
import { COLOR } from '../../Styles/Colors';

const AgeScreen = ({ SignUpData }) =>
{
	const navigation = useNavigation();
	const [birthday, setBirthday] = useState(null);
	const [isPickerVisible, setPickerVisibility] = useState(false);
	const today = new Date();

	useEffect(() => {
		const fetchBirthday = async () => {
			await new Promise(resolve => setTimeout(resolve, 500));
			const initialBirthday = new Date();
			setBirthday(initialBirthday);
		};

		fetchBirthday();
	}, []);

	const handleFocus = () => {
		if (!isPickerVisible)
		{
			setPickerVisibility(true);
		}
	};

	const handleBlur = () =>
	{
		if (isPickerVisible)
		{
			setPickerVisibility(false);
			Keyboard.dismiss();
		}
	}

	const backArrow = () => {
		navigation.navigate('PasswordScreen');
	};

	// Checks that password is valid if not shows user why not
	const nextButton = () =>
	{
		if (isValidDate(birthday))
		{
			setPickerVisibility(false);
			SignUpData.birthday = birthday;
			navigation.navigate('BodyInfoScreen', { SignUpData });
		}
		else
		{
			Alert.alert('Invalid birthday');
		}
	};

	const getAge = (birthday): string => {
		if (!(birthday instanceof Date))
		{
			console.log('Invalid birthday', birthday);
			return '';
		}

	  	let ageInYears = today.getFullYear() - birthday.getFullYear();

		// Adjust for leap year and if birthday hasn't happened yet this year
		if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()))
		{
			ageInYears--;
		}

		const ageString = ageInYears > 1 ? `${ageInYears} years old` : `${ageInYears} year old`;
		return ageString;
	};

	const handleDateChange = (event, selectedDate):void => {
		if (selectedDate)
		{
			setBirthday(selectedDate);
			console.log(birthday);
		}
	};

	useEffect(() => {
    getAge(birthday);
}, [birthday]);

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
				<TouchableWithoutFeedback onPress={handleBlur}>
					<View style={Styles.TouchableWithoutFeedback}>
						<View style={SignUpStyle.container}>
							<TouchableOpacity onPress={backArrow}>
								<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
							</TouchableOpacity>
							<SignUpComponent.DatePreview
								heading="What's your Birthday?"
								subheading={"Enter your own birthday, it helps our algorithms for maximizing the gains"}
								placeholder={`Birthday (${getAge(birthday)})`}
								date={birthday}
								value={birthday ? birthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
								onChangeText={(text) => setBirthday(new Date(text))}
								style={{
									container: SignUpStyle.input,
									heading: SignUpStyle.heading,
									subheading: SignUpStyle.subheading,
								}}
								isFocused={isPickerVisible}
								onFocus={handleFocus}
							/>
							<TouchableOpacity onPress={nextButton} style={SignUpStyle.nextButton}>
								<Text style={SignUpStyle.nextButtonText}>Next</Text>				
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
			{ isPickerVisible && (
						<View style={SignUpStyle.datePickerView}>
							<DateTimePicker 
								style={SignUpStyle.dateTimePicker}
								value={birthday} 
								onChange={(event, selectedDate) => handleDateChange(event, selectedDate)} 
								maximumDate={today} 
								mode="date"
								display="spinner"
							/>
						</View>
					)}
		</Component.PrimaryBackground>
	);
};

export default AgeScreen;