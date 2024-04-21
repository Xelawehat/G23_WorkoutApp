import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import EmailScreen from '../Screens/Authentication/SignUp/EmailScreen';
import UsernameScreen from '../Screens/Authentication/SignUp/UsernameScreen';
import PasswordScreen from '../Screens/Authentication/SignUp/PasswordScreen';
import AgeScreen from '../Screens/Authentication/SignUp/AgeScreen';
import BodyInfoScreen from '../Screens/Authentication/SignUp/BodyInfoScreen';
import GoalScreen from '../Screens/Authentication/SignUp/GoalScreen';


const Stack = createStackNavigator();

const SignUpStack = () => {
	return (
		<Stack.Navigator initialRouteName="EmailScreen" screenOptions={{ headerShown: false }}>
			<Stack.Screen 
				name="EmailScreen"
				component={EmailScreen}
			/>
			<Stack.Screen 
				name="UsernameScreen"
				component={UsernameScreen}
			/>
			<Stack.Screen 
				name="PasswordScreen"
				component={PasswordScreen}
			/>
			<Stack.Screen 
				name="AgeScreen"
				component={AgeScreen}
			/>
			<Stack.Screen 
				name="BodyInfoScreen"
				component={BodyInfoScreen}
			/>
			<Stack.Screen 
				name="GoalScreen"
				component={GoalScreen}
			/>
		</Stack.Navigator>
	)
};

export default SignUpStack;