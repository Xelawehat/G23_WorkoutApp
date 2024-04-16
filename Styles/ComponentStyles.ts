import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {COLOR} from './Colors';


const screenDimensions = Dimensions.get('window');

/*
	Styles for Base Components
*/

const ComponentStyle = StyleSheet.create({

	primaryBackground:
	{
		flex: 1,
		...StyleSheet.absoluteFillObject,
	},
	primaryBackgroundMask:
	{
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.1)',
	},

	primaryTextInputContainer:
	{
		width: '100%',
		borderRadius: 10,
		marginVertical: 5,
		textAlign: 'left',
		color: COLOR.primaryText,
		borderColor: COLOR.primaryText,
		borderWidth: 2,
		justifyContent: 'center',
		backgroundColor: COLOR.opaqueColor('#4c956c',0.5),
		minHeight: 62,
	},
	primaryTextInputPlaceholder:
	{
		position: 'absolute',
		left: 15,
		fontSize: 16,
		color: COLOR.thirdText,
		justifyContent: 'center',
		textAlign: 'left',
	},
	primaryTextInputPlaceholderShift:
	{
		position: 'absolute',
		left: 15,
		top: 5,
		fontSize: 12,
		color: COLOR.primaryText,
	},
	primaryTextInputText:
	{
		fontSize: 16,
		color: COLOR.primaryText,
		left: 15,
		top: 5,
		justifyContent: 'center',
		textAlign: 'left',
	},
	primaryTextInputDynamicContainer:
	{
		flex: 1,
		backgroundColor: 'red',
		position: 'absolute',
		...screenDimensions,
		margin: 0,
		padding: 0,
	},

	container:
	{
		width: '100%',
	},
	signupHeading:
	{
		position: 'relative',
		fontSize: 16,
		color: COLOR.thirdText,
		textAlign: 'left',
	}


});

export default ComponentStyle;