import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notification from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import NetworkInformation from './networkFetcher';

import store from './StateManagement/store';
import AuthNavigator from './Navigators/AuthNavigator';
import getIPAddress from './networkFetcher';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    };
  }
});

const App: React.FC = () => {

  //Notification
  useEffect(() => {
    //When app is closed
    const backgroundSubscription = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    //When the app is open
    const foregroundSubscription = Notification.addNotificationReceivedListener(notification => {
      console.log(notification);
      alert("notification received");
    });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    }
  }, []);



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
