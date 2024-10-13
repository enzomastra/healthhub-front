import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.muscle}>Muscle: {exercise.muscle}</Text>
      <Text style={styles.instructions}>Instructions: {exercise.instructions}</Text>
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
});

export default ExerciseDetails;
