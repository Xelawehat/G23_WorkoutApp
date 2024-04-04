import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView,
         Text, TouchableOpacity, Switch, Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Example() {
  const [form, setForm] = useState({
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
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
                    // handle onPress
                    alert('This will take you to an edit profile page\nthis should be similar to the page used in account creation (maybe the same page)')
                    //Edit profile page should be laid out similar to the settings page and the welcome/login page
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

                    <Text style={styles.rowLabel}>Push Notifications</Text>

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
                            //handle onPress
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
                      // handle onPress
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
                            //handle onPress
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
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 24, paddingHorizontal: 0, flexGrow: 1, flexShrink: 1, flexBasis: 0,},
  header: { paddingLeft: 24, paddingRight: 24, marginBottom: 12,},
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
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
});