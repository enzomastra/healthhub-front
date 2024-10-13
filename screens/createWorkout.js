import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveWorkout, addExerciseToWorkout, fetchExerciseDetails } from '../api';

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([]);
  const [workoutId, setWorkoutId] = useState(null);
  const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
  const navigation = useNavigation();

  const handleAddExercise = () => {
    navigation.navigate('SearchExercise', {
      workoutId,
    });
  };

  const handleCreateWorkout = async () => {
    if (!workoutName || !description) {
      Alert.alert('Validation Error', 'Please enter both workout name and description.');
      return;
    }

    try {
      const workout = { name: workoutName, description };
      const savedWorkout = await saveWorkout(workout);
      setWorkoutId(savedWorkout.id);
      Alert.alert('Success', 'Workout created successfully!');
    } catch (error) {
      console.error('Error creating workout:', error);
      Alert.alert('Error', 'Failed to create workout. Please try again.');
    }
  };

  const handleExerciseClick = async (exerciseName) => {
    try {
      const exerciseDetails = await fetchExerciseDetails(exerciseName);
      setSelectedExerciseDetails(exerciseDetails);
    } catch (error) {
      console.error('Error fetching exercise details:', error);
      Alert.alert('Error', 'Failed to fetch exercise details. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Workout Name</Text>
      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      {!workoutId ? (
        <Button title="Create Workout" onPress={handleCreateWorkout} />
      ) : (
        <>
          <Button title="Add Exercise" onPress={handleAddExercise} />
          <FlatList
            data={exercises}
            keyExtractor={(item) => `${item.name}-${item.muscle}`}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleExerciseClick(item.name)}>
                <View style={styles.exerciseItem}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CreateWorkout;