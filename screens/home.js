import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchTrendingExercises } from '../api';
import { FlashList } from '@shopify/flash-list';
import ExerciseCard from '../components/ExerciseCard';

const Home = () => {
  const [trendingExercises, setTrendingExercises] = useState([]);

  useEffect(() => {
    const loadTrendingExercises = async () => {
      try {
        const exercises = await fetchTrendingExercises();
        setTrendingExercises(exercises);
      } catch (error) {
        console.error('Error loading trending exercises:', error);
      }
    };

    loadTrendingExercises();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bienvenido a FitApp</Text>
      <Text style={styles.sectionSubtitle}>Ejercicios en Tendencia</Text>

      <View style={styles.flashListContainer}>
        <FlashList
          data={trendingExercises}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          estimatedItemSize={150} // Ajusta según el tamaño de tus tarjetas
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: '#271F30',
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  flashListContainer: {
    flex: 1,
    marginTop: 10,
  },
});

export default Home;
