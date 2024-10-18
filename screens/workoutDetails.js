import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchWorkoutDetails, fetchExerciseDetails } from '../api';
import { FlashList } from '@shopify/flash-list'; 
import { useNavigation } from '@react-navigation/native';
import ExerciseCard from '../components/ExerciseCard'; 

const WorkoutDetails = ({ route }) => {
  const navigation = useNavigation();
  const { workoutId } = route.params;
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);


  const loadWorkoutDetails = async () => {
    try {
      setLoading(true);
      const workoutData = await fetchWorkoutDetails(workoutId);
      setWorkout(workoutData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workout details:', error);
      setLoading(false);
    }
  };

  const handleExerciseClick = async (exercise) => {
    try {
      const encodedExerciseName = encodeURIComponent(exercise.name);
      const exerciseDetails = await fetchExerciseDetails(encodedExerciseName);
      // Navegar a la pantalla de detalles del ejercicio con los detalles como parámetro
      navigation.navigate('ExerciseDetails', { exercise: exerciseDetails });
    } catch (error) {
      console.error('Error fetching exercise details:', error);
    }
  };

  useEffect(() => {
    loadWorkoutDetails(); // Cargar los detalles del workout cuando se monta el componente
  }, [workoutId]);

  if (loading) {
    return <Text style={styles.loadingText}>Loading workout details...</Text>;
  }

  if (!workout) {
    return <Text style={styles.loadingText}>Workout not found...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.workoutTitle}>{workout.name}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <FlashList
        data={workout.exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => handleExerciseClick(item)}  // Llamada a la función cuando se presiona la tarjeta
          />
        )}
        estimatedItemSize={100}
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#271F30',
    flex: 1,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  workoutDescription: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});

export default WorkoutDetails;
