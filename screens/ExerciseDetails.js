import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchExerciseDetails } from '../api';  // Asume que tienes una función que busca los detalles

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;  // Recibe el ejercicio desde route.params
  const [exerciseDetails, setExerciseDetails] = useState(exercise);

  useEffect(() => {
    const loadExerciseDetails = async () => {
      try {
        // Solo hacer la solicitud si faltan detalles como instructions
        if (!exercise.instructions) {
          const details = await fetchExerciseDetails(encodeURIComponent(exercise.name));
          setExerciseDetails(details);
        }
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    loadExerciseDetails();
  }, [exercise]);

  return (
    <View style={styles.container}>
      {exerciseDetails ? (
        <>
          <Text style={styles.title}>{exerciseDetails.name}</Text>
          <Text style={styles.muscle}>Muscle: {exerciseDetails.muscle}</Text>
          <Text style={styles.instructions}>
            Instructions: {exerciseDetails.instructions || 'Loading...'}
          </Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading exercise details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  muscle: {
    fontSize: 18,
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ExerciseDetails;
