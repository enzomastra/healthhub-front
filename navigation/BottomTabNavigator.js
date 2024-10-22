import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Routines from '../screens/workout';
import { Image } from 'react-native';
import icons from '../constants/icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? icons.home : icons.home;
          } else if (route.name === 'Profile') {
            iconName = focused ? icons.profile : icons.profile;
          } else if (route.name === 'Routines') {
            iconName = focused ? icons.routines : icons.routines;
          }

          return <Image source={iconName} style={{ width: 24, height: 24 }} />;
        },
        tabBarActiveTintColor: '#F05219',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8', 
          borderTopWidth: 3, 
          elevation: 0,
          shadowOpacity: 0, 
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Routines" component={Routines} />
    </Tab.Navigator>
  );
}