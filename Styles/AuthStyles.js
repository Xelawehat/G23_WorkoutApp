import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLOR } from './Colors';

const AuthStyles = StyleSheet.create({

	safeZone:
	{
		flex: 1,
	},

	ScrollView:
	{
		flex: 1,
	},
	
	container:
	{
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
	},

	createAccountContainer:
	{
		width: '92%',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 75,
	},

	loginButton:
	{
		height: 40,
  		width: '100%',
  		borderWidth: 1,
 		borderRadius: 10, 
  		borderColor: COLOR.primaryButtonBackground,
  		backgroundColor: COLOR.primaryButtonBackground,
  		justifyContent: 'center',
  		alignItems: 'center',
  		margin: 5,
  	},
  	loginButtonText:
  	{
  		color: COLOR.primaryText,
  		fontSize: 16,
  	},

	forgotPassButton:
	{

	},

	createAccountButton:
	{
		height: 40,
  		width: '100%',
  		borderWidth: 1,
 		borderRadius: 5, 
  		borderColor: COLOR.primaryButtonBackground,
  		backgroundColor: COLOR.opaqueColor(COLOR.primaryButtonBackground,0.6),
  		justifyContent: 'center',
  		alignItems: 'center',
	},
	createAccountButtonText:
	{
		color: COLOR.thirdText,
		fontSize: 18,
	},

	signUpContainer:
	{
		flex: 1,
		justifyContent: 'center',
	},

	backArrow:
	{	
		left: 20,
		bottom: 10,
		position: 'relative',
		justifyContent: 'center',
  		alignItems: 'center',
	}
});

export default AuthStyles;