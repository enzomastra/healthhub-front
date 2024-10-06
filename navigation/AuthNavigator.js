import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome';
import SignIn from '../screens/sign-in';
import SignUp from '../screens/sign-up';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}