import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUserWorkouts } from '../api';
import { useNavigation } from '@react-navigation/native';
import WorkoutCard from '../components/WorkoutCard';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const fetchedWorkouts = await fetchUserWorkouts();
        setWorkouts(fetchedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    loadWorkouts();
  }, []);

  const handleWorkoutPress = (workoutId) => {
    navigation.navigate('WorkoutDetails', { workoutId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleWorkoutPress(item.id)}>
            <WorkoutCard workout={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Workout;