import React from 'react';
import { Text, View } from 'react-native';

const CalendarScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => alert('This is where the calendar page')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Calendar</Text>
        </View>
    );
};

//screen title
CalendarScreen.navigationOptions = {
    title: 'Calendar'
};
export default CalendarScreen;