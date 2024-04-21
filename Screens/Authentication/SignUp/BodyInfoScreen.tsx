import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Button, TextInput, Alert, TouchableOpacity,Text, ScrollView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RulerPicker } from 'react-native-ruler-picker';

import * as Component from '../../../Components/Components';
import * as SignUpComponent from '../../../Components/SignUpComponents';
import { isValidWeight } from '../../../Utils/DataVerify';
import { updateSignUpData } from '../../../StateManagement/actions';

import Styles from '../../../Styles/Styles';
import SignUpStyle from '../../../Styles/SignUpStyle';
import ComponentStyle from '../../../Styles/ComponentStyles';
import { COLOR } from '../../../Styles/Colors';


const BodyInfoScreen = ({ navigation }) =>
{
	const signUpData = useSelector((state) => state.signUpData);
	const dispatch = useDispatch();

	const [isRulerVisible, setRulerVisibility] = useState(false);
	const [isWeightFocused, setWeightFocus] = useState(false);

	// We only need rulerVal in final product its height in inches
	const [rulerVal, setRulerVal] = useState(signUpData?.heightInches || '');
	const [weight, setWeight] = useState(signUpData?.weight || '');
	const [gender, setGender] = useState(signUpData?.gender || '');


	// These are used to better show the users their height
	const [feet, setFeet] = useState(0);
	const [inches, setInches] = useState(0);

	const rulerChange = (rulerVal: number) => {
		let feet = parseInt(rulerVal / 12);
		let inches = rulerVal % 12;

		setRulerVal(rulerVal);
		setFeet(feet);
		setInches(inches);
	};

	const getRulerVal = (): number => {
		return parseInt(rulerVal);
	};

	const handleGenderChange = (newGender) => {
		setGender(newGender);
	}

	const handleFocusHeight = () => {
		if (isWeightFocused)
		{
			handleBlur();
		}
		setRulerVisibility(true);
	}

	const handleFocusWeight = () => {
		if (isRulerVisible)
		{
			setRulerVisibility(false);
		}
		setWeightFocus(true);
	}

	const handleBlur = () =>
	{
		Keyboard.dismiss();
		setWeightFocus(false);
		setRulerVisibility(false);
	}

	const backArrow = () => {
		dispatch(updateSignUpData({ heightInches: rulerVal, weight, gender }));
		navigation.navigate('AgeScreen');
	};

	const nextButton = () => {

		let isWeightValid = isValidWeight(weight);
		if (rulerVal && isValidWeight(weight) && gender)
		{	
			dispatch(updateSignUpData({ heightInches: rulerVal, weight, gender }));
			navigation.navigate('GoalScreen');
		}
		else
		{
			Alert.alert('', isWeightValid?.reason || 'Missing info about you');
		}
	};

	// Sets all default height values to equivalent of 60 inches
	useEffect(() => {
		rulerChange(signUpData?.heightInches || 60);
	}, []);

	return (
		<Component.PrimaryBackground>
			<SafeAreaView style={Styles.safeZone}>
					<TouchableWithoutFeedback onPress={handleBlur}>
					<View style={Styles.TouchableWithoutFeedback}>
						<View style={SignUpStyle.container}>

							<TouchableOpacity onPress={backArrow}>
								<Icon name="arrow-back-ios" color="#FFF" style={SignUpStyle.backArrow}/>
							</TouchableOpacity>

							<View style={ComponentStyle.container}>
								<Text style={SignUpStyle.heading}>
									Tell us about your body?
								</Text>
								<Text style={SignUpStyle.subheading}>
									We need to get some info from you... of course some of this can change over time
								</Text>
							</View>
							<View style={SignUpStyle.bodyInfoView}>
									<Text style={SignUpStyle.subheadingBodyText}>Height:</Text>
									<View style={SignUpStyle.bodyViewStyle}>
										<SignUpComponent.DatePreviewHelper
											style={[SignUpStyle.height, {borderColor: isRulerVisible ? '#FFF' : '#333333'}]}
											placeholder="Feet"
											date={`${feet}`}
											value={`${feet}`}
											onFocus={handleFocusHeight}
										/>
										<SignUpComponent.DatePreviewHelper
											style={[SignUpStyle.height, {borderColor: isRulerVisible ? '#FFF' : '#333333'}]}
											placeholder="Inches"
											date={`${inches}`}
											value={`${inches}`}
											onFocus={handleFocusHeight}
										/>
									</View>
									<Text style={SignUpStyle.subheadingBodyText}>Weight:</Text>
									<View style={SignUpStyle.bodyViewStyle}>
										<SignUpComponent.DatePreviewHelper
											style={[SignUpStyle.height, {borderColor: isWeightFocused ? '#FFF' : '#333333'}]}
											inputMode="numeric"
											placeholder="Weight (lbs)"
											value={weight}
											onChangeText={setWeight}
											onFocus={handleFocusWeight}
										/>
									</View>
									{/*<Text style={SignUpStyle.subheadingBodyText}>Gender:</Text>*/}
									<View style={SignUpStyle.bodyViewStyle}>
									    <TouchableOpacity
										    style={[SignUpStyle.genderButton, gender === 'male' && SignUpStyle.selectedGenderButton]}
										    onPress={() => handleGenderChange('male')}
										  >
										  	<Text style={SignUpStyle.genderText}>Male</Text>
										  </TouchableOpacity>
										  <TouchableOpacity
										    style={[SignUpStyle.genderButton, gender === 'female' && SignUpStyle.selectedGenderButton]}
										    onPress={() => handleGenderChange('female')}
										  >
										  	<Text style={SignUpStyle.genderText}>Female</Text>
										  </TouchableOpacity>
									  </View>
							</View>
							<TouchableOpacity onPress={nextButton} style={SignUpStyle.nextButton}>
								<Text style={SignUpStyle.nextButtonText}>Next</Text>				
							</TouchableOpacity>
						</View>
					</View>
					</TouchableWithoutFeedback>
					{ isRulerVisible && (
						<View>
							<RulerPicker
								  min={24}
								  max={96}
								  gapBetweenSteps={12}
								  step={1}
								  fractionDigits={0}
								  onValueChangeEnd={(rulerVal) => rulerChange(rulerVal)}
								  unit="in"
								  initialValue={getRulerVal()}
								  height={150}
								  shortStepColor={COLOR.primaryButtonBackground}
								  longStepColor={COLOR.secondaryButtonBackground}
								  indicatorColor={COLOR.primaryText}
								  valueTextStyle={COLOR.primaryText}
							/>
						</View>
					)}
			</SafeAreaView>
		</Component.PrimaryBackground>
	);
};

export default BodyInfoScreen;