import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ( { navigation }) => {
  return (
    <SafeAreaView>
      <Text style={styles.welcome}>Welcome User</Text>
      <ScrollView>
        <View style={ styles.button }>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateWorkout')
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
        <Text style={styles.information}>Workouts Completed: 15</Text>
        <Text style={styles.information}>Current Streak: 3</Text>
        <Text style={styles.information}>Average Time: 45 minutes</Text>
        {/*These are dummy values, pull the appropriate data from the database to fill in the blanks*/}
        <Ionicons style={ styles.logo }
        name="barbell-outline" size={200}/>
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: '2.5%', 
    fontSize: 32, 
    fontWeight: '700',
    paddingLeft: '5%',
    paddingBottom: '5%'
  },
  summary: {
    paddingTop: '2.5%',
    fontSize: 25,
    paddingLeft: '5%',
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
  logo: {
    paddingLeft: '25%',
    paddingTop: '5%'
  }
});

export default HomePage;