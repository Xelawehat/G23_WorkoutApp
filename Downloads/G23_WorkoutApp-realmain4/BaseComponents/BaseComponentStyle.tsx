import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/*
	Styles for Base Components
*/
const BaseComponentStyle = StyleSheet.create({

	primaryBackground:
	{
		...StyleSheet.absoluteFillObject,
	},
	primaryBackgroundMask:
	{
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},

	primaryTextInputContainer:
	{
		width: '90%',
		borderWidth: 0.5,
		borderRadius: 10,
		margin: 5,
		paddingHorizontal: 10,
		textAlign: 'left',
		color: '#FFFFFF',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	primaryTextInputPlaceholder:
	{
		position: 'absolute',
		left: 10,
		fontSize: 16,
		color: '#CCCCCC',
		justifyContent: 'center',
		textAlign: 'left',
	},
	primaryTextInputPlaceholderShift:
	{
		position: 'absolute',
		left: 10,
		top: 5,
		fontSize: 12,
		color: '#FFF',
	},
	primaryTextInputText:
	{
		fontSize: 16,
		color: '#FFF',
		top: 5,
		justifyContent: 'center',
		textAlign: 'left',
	},


});

export default BaseComponentStyle;