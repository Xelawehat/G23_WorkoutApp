import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'

const HomePage = () => {
  return (
    <View>
      <Text style={styles.welcome}>Welcome User</Text>
      {/*if we have time change user to the users name*/}
      <CalStrip/>
      <Text style={styles.summary}>Summary</Text>
      <Text style={styles.information}>Workouts Completed: 15</Text>
      <Text style={styles.information}>Current Streak: 3</Text>
      <Text style={styles.information}>Workouts/Week: 4.8</Text>
      {/*This can be expanded or taken out, I couldn't remember the layout of the homepage*/}
      {/*These are dummy values, pull the appropriate data from the database to fill in the blanks*/}
      <Ionicons style={{paddingLeft: '25%'}}
      name="barbell-outline" size={200}/>
    </View>
  );
};

// Pre-built calendar prop
const CalStrip = () => (
  <View style={styles.calendar}>
    <CalendarStrip
      scrollable
      style={{height: 200, paddingTop: 25, paddingBottom: 25}}
      calendarColor={'white'}
      calendarHeaderStyle={{color: 'black', fontSize: 22}}
      dateNumberStyle={{color: 'black', fontSize: 20}}
      dateNameStyle={{color: 'black', fontSize: 12}}
      disabledDateNameStyle={{color: 'grey'}}
      disabledDateNumberStyle={{color: 'grey'}}
      highlightDateNumberStyle={{color: 'blue'}}
      highlightDateNameStyle={{color: 'blue'}}
      iconContainer={{flex: 0.1}}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    flex: 1,
    paddingTop: '8%',
  },
  welcome: {
    paddingTop: '20%', 
    fontSize: 32, 
    fontWeight: 'bold',
    paddingLeft: '5%'
  },
  summary: {
    paddingTop: '60%',
    fontSize: 25,
    paddingLeft: '5%',
    fontWeight: 'semibold',
    color: 'black'
  },
  information : {
    paddingTop: '3%', 
    paddingLeft: '15%', 
    fontSize: 18
  }
});

export default HomePage;