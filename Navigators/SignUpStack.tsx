import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EmailView from '../Views/SignUpViews/EmailView';
import UsernameView from '../Views/SignUpViews/UsernameView';
import PasswordView from '../Views/SignUpViews/PasswordView';

const Stack = createStackNavigator();

const SignUpStack = () => {
	return (
		<Stack.Navigator initialRouteName="EmailView" screenOptions={{ headerShown: false }}>
			<Stack.Screen 
				name="EmailView"
				component={EmailView}
			/>
			<Stack.Screen 
				name="UsernameView"
				component={UsernameView}
			/>
			<Stack.Screen 
				name="PasswordView"
				component={PasswordView}
			/>
		</Stack.Navigator>
	)
}

export default SignUpStack;