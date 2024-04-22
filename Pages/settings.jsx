import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView,
         Text, TouchableOpacity, Switch, Image,
         Button,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation  } from '@react-navigation/native';
import * as ComponentBackground from '../Components/Components';
import * as Notif from 'expo-notifications';

export default function Settings() {
  const [form, setForm] = useState({
    pushNotifications: true,
  }); 
  const navigation = useNavigation();

  const handleNotif = () => {

    if(!form.pushNotifications)
    {
      console.log("enable notifs");
      Notif.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false
          };
        }
      });
    }
    else
    {
      console.log("disable notifs");
      Notif.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false
          };
        }
      });
      Notif.cancelAllScheduledNotificationsAsync();
    }
  }

  return (
    <ComponentBackground.PrimaryBackground>
    <SafeAreaView style={{ flex: 1}}>
      <View>
      <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
      </View>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile')
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: 'white' }]}>
                    <FeatherIcon name="edit" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Edit Profile</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon]}>
                      <FeatherIcon name="bell" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications =>
                        {
                          setForm({ ...form, pushNotifications });
                          handleNotif();
                        }
                        
                      }
                      value={form.pushNotifications} />
                  </View>
                </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <View style={styles.sectionBody}>

                <View style ={styles.rowWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            alert('To log, view, or plan workouts go to the calendar section')
                            //We may want to make this a whole page to show how to use the app
                        }}
                        style={styles.row}>
                        <View
                      style={[styles.rowIcon]}>
                      <FeatherIcon name="help-circle" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>How-To</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon name="chevron-right" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      alert('This application was created as a simple way to log, view, plan, and track workouts')
                    }}
                    style={styles.row}>
                    <View
                      style={[styles.rowIcon]}>
                      <FeatherIcon name="info" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>About</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon name="chevron-right" size={20} />
                  </TouchableOpacity>
                </View>

                <View style ={styles.rowWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            alert('Created by:\nBrady, Nolan, Alex, Nick, Krystal')
                        }}
                        style={styles.row}>
                        <View
                      style={[styles.rowIcon]}>
                      <FeatherIcon name="pen-tool" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Contributors</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon name="chevron-right" size={20} />
                    </TouchableOpacity>
                </View>
              </View>
              <View style={ styles.logout }>
                <TouchableOpacity
                  onPress={() => {
                    alert("Logging Out...")
                  }}
                  style={styles.logButton}>
                  <Text style={styles.buttonTitle}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  </ComponentBackground.PrimaryBackground>
  );
}

const styles = StyleSheet.create({
  header: { 
    paddingLeft: 24, 
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
  },
  logout: {
    paddingTop: '25%',
    paddingLeft: '30%'
  },
  buttonTitle: {
    fontSize: 20,
    color: 'red'
  },
  logButton: {
    height: 50,
    width: 150,
    borderColor: 'red',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center'
  },
});