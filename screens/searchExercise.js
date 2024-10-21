import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchExercises, addExerciseToWorkout as apiAddExerciseToWorkout } from '../api'; // Renombramos la función importada
import { useNavigation, useRoute } from '@react-navigation/native';

const SearchExercise = () => {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { workoutId } = route.params;

  const searchExercises = async (searchQuery) => {
    try {
      const result = await fetchExercises(searchQuery);
      setExercises(result);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  // Renombramos la función local para evitar el conflicto
  const handleAddExerciseToWorkout = async (workoutId, exerciseName) => {
    try {
      await apiAddExerciseToWorkout(workoutId, exerciseName); // Usamos la función renombrada
      Alert.alert('Success', `${exerciseName} has been added to your workout.`);
      // Navegar de regreso a la pantalla de edición del workout
      navigation.goBack();
    } catch (error) {
      console.error('Error adding exercise to workout:', error);
    }
  };

  useEffect(() => {
    searchExercises('');
  }, []);

  const handleSearch = () => {
    searchExercises(query);
  };

  const handleSelectExercise = (exercise) => {
    if (workoutId) {
      handleAddExerciseToWorkout(workoutId, exercise.name); // Llamamos a la función correctamente
    } else {
      console.error('Workout ID is null');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search exercises"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={exercises}
        keyExtractor={(item) => `${item.name}-${item.muscle}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectExercise(item)}>
            <Text style={styles.exerciseItem}>{item.name}</Text>
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

export default SearchExercise;
