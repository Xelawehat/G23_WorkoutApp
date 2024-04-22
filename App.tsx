import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notif from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import store from './StateManagement/store';
import AuthNavigator from './Navigators/AuthNavigator';

// Notifications handler setup
Notif.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    };
  }
});

// randomly decides if a generic notification should be scheduled for later
// 20% chance to schedule one, randomized time
const startupNotif = () => {

  // if greater than 0 (0 - 0.99), don't schedule. Otherwise do
  if(Math.floor(Math.random() * 5))
  {
    console.log("didn't send notif");
      return;
  }
  // random messages
  const rand1 = "🗣️🗣️🗣️ RISE AND GRIND!!! You should work out today.";
  const rand2 = "🔥🔥🔥 GET UP AND GET READY FOR A WORKOUT 🔥🔥🔥";
  const rand3 = "DON'T BE A BUM TODAY, GET TO THE GYM 😤😤😤";
  const rand4 = "STOP LOUNGING AROUND AND BEING LAZY. WAKE UP AND DO SOME REPS!";
  const rand5 = "Why not better yourself today? Schedule a workout now.";
  const RandomNotifText = [rand1, rand2, rand3, rand4, rand5];
  const notifbody = RandomNotifText[Math.floor(Math.random() * 4.99)];
  const triggertime = Math.floor(Math.random() * 10) + 1;

  Notif.scheduleNotificationAsync({
    content: {
      title: "Workout App Notification",
      body: notifbody
    },
    trigger: {
      seconds: triggertime

    },
  });
}

const App: React.FC = () => {
  startupNotif();

  //Notification listener setup
  useEffect(() => {
    const backgroundListener = Notif.addNotificationResponseReceivedListener(response => {
    });
    const openListener = Notif.addNotificationReceivedListener(notification => {
    });

    return () => {
      backgroundListener.remove();
      openListener.remove();
    }
  }, []);

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
