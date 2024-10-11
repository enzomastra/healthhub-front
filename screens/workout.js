import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import WorkoutCard from '../components/WorkoutCard';
import { fetchUserWorkouts } from '../api';
import BackButton from '../components/BackButton';

const Routines = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserWorkouts = async () => {
      try {
        const workouts = await fetchUserWorkouts();
        setUserWorkouts(workouts);
      } catch (error) {
        console.error('Error loading user workouts:', error);
      }
    };

    loadUserWorkouts();
  }, []);

  const handleCreateNewRoutine = () => {
    navigation.navigate('CreateWorkout');
  };

  const handleWorkoutPress = (workout) => {
    navigation.navigate('WorkoutDetails', { workout });
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateNewRoutine}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>

      {userWorkouts.length === 0 ? (
        <Text style={styles.noWorkoutsText}>No workouts, create a new one!</Text>
      ) : (
        <View style={styles.flashListContainer}>
          <View style={{ height: 200, width: Dimensions.get("screen").width }}>
            <FlashList
              data={userWorkouts}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
                  <WorkoutCard workout={item} />
                </TouchableOpacity>
              )}
              estimatedItemSize={150}
              horizontal={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#271F30',
  },
  createButton: {
    position: 'absolute',
    top: 25,
    right: 20,
    backgroundColor: '#F05219',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  createButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  noWorkoutsText: {
    paddingTop: 290,
    alignItems: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  flashListContainer: {
    flex: 1,
    marginTop: 80, // Ajustar el margen superior para que no se superponga con el botón
  },
});

export default Routines;