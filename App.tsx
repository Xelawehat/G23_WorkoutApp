import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import NetworkInformation from './networkFetcher';

import store from './StateManagement/store';
import AuthNavigator from './Navigators/AuthNavigator';
import getIPAddress from './networkFetcher';

const App: React.FC = () => {
  //const address = NetworkInformation;
  const address = getIPAddress().then(ip => console.log('ip:',ip));
  console.log('\n\nString one:', NetworkInformation.toString());
  console.log('Network info:wwww', NetworkInformation);
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
