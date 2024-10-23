import React, { useState, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import ExerciseCard from '../components/ExerciseCard';
import { updateWorkout, removeExerciseFromWorkout, deleteWorkout, fetchWorkoutDetails } from '../api';
import BackButton from '../components/BackButton';

const EditWorkout = () => {
  const route = useRoute();
  const { workout } = route.params || {};
  const [exercises, setExercises] = useState(workout.exercises);
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const navigation = useNavigation();

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

  useFocusEffect(
    useCallback(() => {
      refreshWorkoutDetails(); 
    }, [workout.id])
  );

  const handleAddExercise = () => {
    navigation.navigate('SearchExercise', { workoutId: workout.id });
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await removeExerciseFromWorkout(exerciseId);
      setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
      refreshWorkoutDetails();
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  const handleSave = async () => {
    if (name !== workout.name || description !== workout.description) {
      try {
        await updateWorkout(workout.id, name, description);
        Alert.alert('Workout updated successfully');
        navigation.navigate('Workout');
      } catch (error) {
        console.error('Error updating workout:', error);
      }
    } else {
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
      <BackButton />
      <Text style={styles.title}>Edit Workout</Text>
      <Text style={styles.label}>Workout Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Workout Name"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Workout Description"
      />
      <Text style={styles.label}>Exercises</Text>
      <FlashList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <ExerciseCard exercise={item} />
            <Button title="Remove" onPress={() => handleRemoveExercise(item.id)} />
          </View>
        )}
        estimatedItemSize={150}
      />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Button title="Delete Workout" onPress={handleDeleteWorkout} color='red' />
      <Button title="Done" onPress={handleSave} color='green'/>
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
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#fff',
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
