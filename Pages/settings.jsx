import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView,
         Text, TouchableOpacity, Switch, Image,
         Button,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation  } from '@react-navigation/native';

export default function Settings() {
  const [form, setForm] = useState({
    pushNotifications: false,
  }); 
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View>
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
                        setForm({ ...form, pushNotifications })
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
                <Button 
                  title="Log Out"
                  onPress={() => {
                    alert("Logging out")
                  }}
                  color='red'
                >
                </Button>
                </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  }
});