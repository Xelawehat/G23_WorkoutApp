import { StyleSheet } from 'react-native';

import {COLOR} from './Colors';


const SignUpStyle = StyleSheet.create({

	container:
	{	
		flex: 1,
		paddingTop: 30,
		justifyContent: 'flex-start',
		alignSelf: 'center',
		position: 'relative',
		width: '92%',
	},

	backArrow:
	{
		bottom: 20,
		position: 'relative',
		alignSelf: 'flex-start',
		fontSize: 25,
	},

	input:
	{
		alignSelf: 'center',
		alignItems: 'flex-start',
		marginVertical: 20,
	},
	heading:
	{
		fontSize: 28,
		fontWeight: 'bold',
		color: COLOR.primaryText,
		marginBottom: 10,
	},
	subheading:
	{
		marginBottom: 20,
		fontSize: 16,
		color: COLOR.primaryText,
	},

	alreadyHaveContainer:
	{
		justifyContent: 'flex-end',
	},
	alreadyHaveText:
	{
		textAlign: 'center',
		color: COLOR.primaryText,
	},

	nextButton:
	{
		height: 40,
  		width: '100%',
  		borderWidth: 1,
 		borderRadius: 10, 
  		borderColor: COLOR.primaryButtonBackground,
  		backgroundColor: COLOR.primaryButtonBackground,
  		justifyContent: 'center',
  		alignItems: 'center',
	},
	nextButtonText:
	{
		color: COLOR.primaryText,
  		fontSize: 16,
	},

	datePickerView:
	{
		flex: 0.4,
		backgroundColor: COLOR.opaqueColor(COLOR.secondaryText,0.6),
	},
	dateTimePicker:
	{
		flex: 1,
	},

	heightView:
	{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	height:
	{
		width: '35%',
		marginRight: 10,
	},
	subheadingBodyText:
	{
		fontSize: 20,
		fontWeight:'heavy-bold',
		textAlign: 'flex-start',
		color: COLOR.primaryText,
	},

	bodyInfoView:
	{
		marginBottom: 35,
		marginTop: 0,
	},

	bodyViewStyle:
	{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: 20,
		paddingLeft: 0,
	},
	genderButton: 
	{
		marginRight: 10,
    	paddingVertical: 15,
    	paddingHorizontal: 45,
    	borderRadius: 5,
    	borderWidth: 1,
    	backgroundColor: COLOR.primaryButtonBackground, // Adjust background color as needed
    	borderColor: COLOR.primaryText,
  	},
	selectedGenderButton: 
	{
		backgroundColor: COLOR.secondaryButtonBackground, // Adjust background color for selected state
		//borderColor: COLOR.secondaryButtonBackground,
	},
	genderText: 
	{
	   fontSize: 20,
	},

	goalInfoView:
	{
		flex: 1,
		marginBottom: 35,
		marginTop: 0,
	},

	goalViewStyle:
	{
		flexDirection: 'column',
		justifyContent: 'center',
		marginVertical: 20,
		paddingLeft: 0,
	},
	goalButton: 
	{
		alignSelf: 'center',
		width: '65%',
		marginVertical: 20,
    	paddingVertical: 25,
    	borderRadius: 5,
    	borderWidth: 1,
    	backgroundColor: COLOR.primaryButtonBackground, // Adjust background color as needed
    	borderColor: COLOR.primaryText,
  	},
	selectedGoalButton: 
	{
		backgroundColor: COLOR.secondaryButtonBackground, // Adjust background color for selected state
		//borderColor: COLOR.secondaryButtonBackground,
	},
	goalText: 
	{
	   fontSize: 20,
	   textAlign: 'center',
	},

	createAccountButton:
	{
		height: 40,
  		width: '100%',
  		borderWidth: 1,
 		borderRadius: 10, 
  		borderColor: COLOR.primaryButtonBackground,
  		backgroundColor: COLOR.primaryButtonBackground,
  		justifyContent: 'center',
  		alignItems: 'center',
	},
	createAccountButtonText:
	{
		color: COLOR.primaryText,
  		fontSize: 16,
	},


});

export default SignUpStyle;