import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchExerciseDetails } from '../api';
import BackButton from '../components/BackButton';

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;
  const [exerciseDetails, setExerciseDetails] = useState(exercise);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExerciseDetails = async () => {
      try {
        if (!exercise.instructions) {
          const details = await fetchExerciseDetails(encodeURIComponent(exercise.name));
          setExerciseDetails(details);
        }
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExerciseDetails();
  }, [exercise]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F05219" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{exerciseDetails.name}</Text>
        <Text style={styles.muscle}>Muscle: {exerciseDetails.muscle}</Text>
        <Text style={styles.instructions}>
          Instructions: {exerciseDetails.instructions || 'Loading...'}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#271F30',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  muscle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  instructions: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ExerciseDetails;