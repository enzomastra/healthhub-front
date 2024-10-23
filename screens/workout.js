import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchUserWorkouts } from '../api';
import { useNavigation } from '@react-navigation/native';
import WorkoutCard from '../components/WorkoutCard';
import BackButton from '../components/BackButton';

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
      <BackButton />
      <Text style={styles.title}>My Workouts</Text>
      <FlashList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleWorkoutPress(item.id)}>
            <WorkoutCard workout={item} />
          </TouchableOpacity>
        )}
      estimatedItemSize={150}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: '#271F30',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Workout;