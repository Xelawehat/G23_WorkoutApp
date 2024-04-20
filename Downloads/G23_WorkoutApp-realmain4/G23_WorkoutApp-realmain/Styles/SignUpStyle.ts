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


});

export default SignUpStyle;