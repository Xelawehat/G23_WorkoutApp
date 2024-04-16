import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, TextInput, Alert, TouchableOpacity,Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Component from '../../Components/Components';
import * as SignUpComponent from '../../Components/SignUpComponents';
import AuthViewModel from '../../UserAuthentication/AuthViewModel';

import Styles from '../../Styles/Styles';
import SignUpStyle from '../../Styles/SignUpStyle';
import ComponentStyle from '../../Styles/ComponentStyles';
import { COLOR } from '../../Styles/Colors';


const GoalScreen = ({ SignUpData }) =>
{
	const navigation = useNavigation();

	const [goal, setGoal] = useState('');


	// These are used to better show the users their height
	const [feet, setFeet] = useState(0);
	const [inches, setInches] = useState(0);

	const handleGoalChange = (newGoal) => {
		setGoal(newGoal);
	}

	const backArrow = () => {
		navigation.navigate('BodyInfoScreen');
	};

	const createAccountButton = () => {
		console.log(SignUpData);
	};

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
					<ScrollView bounces={false}>
						<View style={SignUpStyle.container}>
							<TouchableOpacity onPress={backArrow}>
								<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
							</TouchableOpacity>
							<View style={ComponentStyle.container}>
								<Text style={SignUpStyle.heading}>
									What're your fitness goals?
								</Text>
								<Text style={SignUpStyle.subheading}>
									You can change this in the future, and probably should at some point
								</Text>
							</View>
							<View style={SignUpStyle.goalInfoView}>		
								<View style={SignUpStyle.goalViewStyle}>
								    <TouchableOpacity
									    style={[SignUpStyle.goalButton, goal === 'bulk' && SignUpStyle.selectedGoalButton]}
									    onPress={() => handleGoalChange('bulk')}
									  >
									  	<Text style={SignUpStyle.goalText}>Bulk</Text>
									  </TouchableOpacity>
									  <TouchableOpacity
									    style={[SignUpStyle.goalButton, goal === 'maintain' && SignUpStyle.selectedGoalButton]}
									    onPress={() => handleGoalChange('maintain')}
									  >
									  	<Text style={SignUpStyle.goalText}>Maintain</Text>
									  </TouchableOpacity>
									   <TouchableOpacity
									    style={[SignUpStyle.goalButton, goal === 'cut' && SignUpStyle.selectedGoalButton]}
									    onPress={() => handleGoalChange('cut')}
									  >
									  	<Text style={SignUpStyle.goalText}>Cut</Text>
									  </TouchableOpacity>
								  </View>
							</View>
							<TouchableOpacity onPress={createAccountButton} style={SignUpStyle.createAccountButton}>
								<Text style={SignUpStyle.createAccountButtonText}>Create Account</Text>				
							</TouchableOpacity>
						</View>
					</ScrollView>
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default GoalScreen;