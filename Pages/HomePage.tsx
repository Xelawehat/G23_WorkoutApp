import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'

const HomePage = () => {
  return (
    <View>
      <Example/>
    </View>
  );
};

// Pre-built calendar prop
const Example = () => (
  <View style={styles.calendar}>
    <CalendarStrip
      scrollable
      style={{height:200, paddingTop: 50, paddingBottom: 10}}
      calendarColor={'#3343CE'}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white'}}
      highlightDateNumberStyle={{color: 'yellow'}}
      highlightDateNameStyle={{color: 'yellow'}}
      disabledDateNumberStyle={{color: 'grey'}}
      disabledDateNameStyle={{color: 'grey'}}
      //disabledDateOpacity={}
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
    // Calendar specific stylesheet
    flex: 1,
    //justifyContent: 'flex-start',
  }
});

// Testing
const test = () => {
  return (
    <View>ff
      <Example/>
    </View>
  );
};

export default HomePage;

