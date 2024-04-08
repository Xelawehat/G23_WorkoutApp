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
		width: '95%',
	},
	backArrow:
	{
		left: 10,
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
		color: COLOR.thirdText,
		marginBottom: 10,
	},
	subheading:
	{
		marginBottom: 20,
		fontSize: 16,
		color: COLOR.thirdText,
	},

	alreadyHaveContainer:
	{
		justifyContent: 'flex-end',
	},
	alreadyHaveText:
	{
		textAlign: 'center',
		color: COLOR.thirdText,
	},

});

export default SignUpStyle;