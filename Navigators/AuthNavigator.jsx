import { createStackNavigator } from '@react-navigation/stack';

import AuthLoginScreen from '../Screens/Authentication/AuthLoginScreen';
import SignUpStack from './SignUpStack';

const Stack = createStackNavigator();

const AuthNavigator = () =>
{
	return (
		<Stack.Navigator 
			initialRouteName="Login"
			screenOptions={{headerShown: false}}
		>
		<Stack.Screen name="Login" component={AuthLoginScreen}/>
		<Stack.Screen name="SignUpStack" component={SignUpStack}/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;