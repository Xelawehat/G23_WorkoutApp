import { createStackNavigator } from '@react-navigation/stack';

import AuthLoginScreen from '../Screens/Authentication/AuthLoginScreen';
import SignUpStack from './SignUpStack';
import HomeTabNavigator from './HomeTabNavigator';

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
		<Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator}/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;