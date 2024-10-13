import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchExercises, addExerciseToWorkout } from '../api';
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

  useEffect(() => {
    searchExercises('');
  }, []);

  const handleSearch = () => {
    searchExercises(query);
  };

  const handleSelectExercise = async (exercise) => {
    if (workoutId) {
      try {
        await addExerciseToWorkout(workoutId, exercise.name);
        Alert.alert('Success', `${exercise.name} has been added to your workout.`);
        navigation.goBack();
      } catch (error) {
        console.error('Error adding exercise to workout:', error);
        Alert.alert('Error', 'Failed to add exercise. Please try again.');
      }
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