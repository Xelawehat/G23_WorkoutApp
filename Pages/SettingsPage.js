import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsPage({navigation}) {
    return{
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            <Text
                onPress={() => alert('This is settings page')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen<
    };
}