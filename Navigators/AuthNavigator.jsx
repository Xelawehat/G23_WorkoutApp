import { createStackNavigator } from '@react-navigation/stack';

import AuthLoginView from '../Views/AuthLoginView';
import AuthSignUpView from '../Views/AuthSignUpView';

const Stack = createStackNavigator();

const AuthNavigator = () =>
{
	return (
		<Stack.Navigator 
			initialRouteName="Login"
			screenOptions={{headerShown: false}}
		>
			<Stack.Screen name="Login" component={AuthLoginView}/>
			<Stack.Screen name="SignUp" component={AuthSignUpView}/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;