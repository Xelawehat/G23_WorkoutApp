import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dataArray from './dataArray';
import * as Component from '../Components/Components';

const HomePage = ( { navigation }) => {

  const getNumWorkouts = () => {
      return dataArray().length;
  };

  return (
    <Component.PrimaryBackground>
    <SafeAreaView>
      <ScrollView>
        <View style={ styles.button }>
        <Text style={styles.welcome}>Welcome User</Text>
        <Ionicons style={ styles.logo }
        name="barbell-outline" size={100}/>
        <TouchableOpacity
            onPress={() => {
              const theBigOne = new Date();
              navigation.navigate('CreateWorkout', {day: theBigOne.toISOString().split('T')[0].toString(), time: theBigOne})
            }}
            style={styles.logButton}>
            <Text style={styles.buttonTitle}>Log a Workout</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.button }>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Calendar')
            }}
            style={styles.viewButton}>
            <Text style={styles.buttonTitle}>View Todays Workouts</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.summary}>Summary</Text>
        <Text style={styles.information}>Workouts Created: {getNumWorkouts()}</Text>
        <Text style={styles.information}>Current Streak: 3</Text>
        <Text style={styles.information}>Average Time: 45 minutes</Text>
        {/*These are dummy values, pull the appropriate data from the database to fill in the blanks*/}
      </ScrollView>
    </SafeAreaView>
    </Component.PrimaryBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingTop: '2.5%',
    paddingBottom: '5%',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 20,
  },
  logButton: {
    height: 50,
    width: 150,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center'
  },
  viewButton: {
    height: 50,
    width: 250,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center'
  },
  welcome: {
    paddingTop: '5%', 
    fontSize: 32, 
    fontWeight: '700',
    paddingBottom: '5%',
    textAlign: 'center',
  },
  summary: {
    paddingTop: '2.5%',
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
    paddingBottom: '5%',
  },
  information : {
    paddingTop: '2.5%', 
    paddingLeft: '15%', 
    fontSize: 20,
    backgroundColor: 'white',
    paddingBottom: '2.5%'
  },
});

export default HomePage;