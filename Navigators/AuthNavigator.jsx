import { createStackNavigator } from '@react-navigation/stack';

import AuthLoginView from '../Views/AuthLoginView';
import SignUpStack from './SignUpStack';


const Stack = createStackNavigator();

const AuthNavigator = () =>
{
	return (
		<Stack.Navigator 
			initialRouteName="Login"
			screenOptions={{headerShown: false}}
		>
			<Stack.Screen name="Login" component={AuthLoginView}/>
			<Stack.Screen name="SignUpStack" component={SignUpStack}/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;