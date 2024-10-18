import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ExerciseDetails from '../screens/exerciseDetails';
import Workout from '../screens/workout';
import CreateWorkout from '../screens/createWorkout';
import SearchExercise from '../screens/searchExercise';
import WorkoutDetails from '../screens/workoutDetails';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
      <Stack.Screen name="SearchExercise" component={SearchExercise} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />

    </Stack.Navigator>
  );
}