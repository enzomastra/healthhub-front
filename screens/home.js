import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { fetchExercises, fetchUserWorkouts } from '../api';
import { FlashList } from '@shopify/flash-list';
import ExerciseCard from '../components/ExerciseCard';
import WorkoutCard from '../components/WorkoutCard';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const result = await fetchExercises('');
        setExercises(result);
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };

    const loadUserWorkouts = async () => {
      try {
        const workouts = await fetchUserWorkouts();
        setUserWorkouts(workouts);
      } catch (error) {
        console.error('Error loading user workouts:', error);
      }
    };

    loadExercises();
    loadUserWorkouts();
  }, []);


  const workoutsWithCreateNew = [...userWorkouts, { isCreateNew: true }];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Welcome to HealthHub</Text>
      <Text style={styles.sectionSubtitle}>Trending Exercises</Text>


      <View style={styles.flashListContainer}>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
          {exercises.length > 0 ? (
          <FlashList
            data={exercises}
            renderItem={({ item }) => <ExerciseCard exercise={item} />}
            estimatedItemSize={150}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={{ color: '#fff' }}>Loading exercises...</Text>
        )}
        </View>
      </View> 

      <Text style={styles.sectionSubtitle}>My Workouts</Text>

      <View style={styles.flashListContainer}>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
          <FlashList
            data={workoutsWithCreateNew}
            renderItem={({ item }) => (
              <WorkoutCard workout={item} isCreateNew={item.isCreateNew} />
            )}
            estimatedItemSize={150}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: '#271F30',
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
});

export default Home;