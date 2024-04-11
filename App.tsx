import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import store from './StateManagement/store';
import AuthNavigator from './Navigators/AuthNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light"/>
        <AuthNavigator/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
