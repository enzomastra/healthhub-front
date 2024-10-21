import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import ExerciseCard from '../components/ExerciseCard';
import { updateWorkout, removeExerciseFromWorkout, deleteWorkout, fetchWorkoutDetails } from '../api';

const EditWorkout = () => {
  const route = useRoute();
  const { workout } = route.params || {};
  const [exercises, setExercises] = useState(workout.exercises);
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const navigation = useNavigation();

  // Función para refrescar los datos del workout desde la API
  const refreshWorkoutDetails = async () => {
    try {
      const updatedWorkout = await fetchWorkoutDetails(workout.id);
      setExercises(updatedWorkout.exercises);
      setName(updatedWorkout.name);
      setDescription(updatedWorkout.description);
    } catch (error) {
      console.error('Error refreshing workout:', error);
    }
  };

  // Usamos useFocusEffect para refrescar los detalles cuando la pantalla es enfocada
  useFocusEffect(
    useCallback(() => {
      refreshWorkoutDetails(); // Refresca los datos cuando la pantalla vuelve a estar enfocada
    }, [workout.id])
  );

  const handleAddExercise = () => {
    navigation.navigate('SearchExercise', { workoutId: workout.id });
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await removeExerciseFromWorkout(exerciseId);
      setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
      refreshWorkoutDetails(); // Refresca después de remover el ejercicio
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  const handleSave = async () => {
    // Si hay algún cambio en el nombre o la descripción
    if (name !== workout.name || description !== workout.description) {
      try {
        await updateWorkout(workout.id, name, description); // Pasamos solo el id, nombre y descripción
        Alert.alert('Workout updated successfully');
        navigation.navigate('Workout'); // Navegamos a la lista de rutinas
      } catch (error) {
        console.error('Error updating workout:', error);
      }
    } else {
      // Si no hay cambios, simplemente navega de vuelta a la lista de rutinas
      navigation.navigate('Workout');
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(workout.id);
      Alert.alert('Workout deleted successfully');
      navigation.navigate('Workout');
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Workout Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Workout Description"
      />
      <FlashList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <ExerciseCard exercise={item} />
            <Button title="Remove" onPress={() => handleRemoveExercise(item.id)} />
          </View>
        )}
      />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Button title="Delete Workout" onPress={handleDeleteWorkout} color="red" />
      <Button title="Done" onPress={handleSave} color="green"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default EditWorkout;