import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { fetchTrendingExercises, fetchUserWorkouts } from '../api';
import { FlashList } from '@shopify/flash-list';
import ExerciseCard from '../components/ExerciseCard';
import WorkoutCard from '../components/WorkoutCard'; // Importar el nuevo componente

const Home = () => {
  const [trendingExercises, setTrendingExercises] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]); // Estado para las rutinas del usuario

  useEffect(() => {
    const loadTrendingExercises = async () => {
      try {
        const exercises = await fetchTrendingExercises();
        setTrendingExercises(exercises);
      } catch (error) {
        console.error('Error loading trending exercises:', error);
      }
    };

    const loadUserWorkouts = async () => {
      try {
        const workouts = await fetchUserWorkouts();
        setUserWorkouts(workouts);
      } catch (error) {
        console.error('Error loading user workouts:', error);
      }
    };

    loadTrendingExercises();
    loadUserWorkouts();
  }, []);

  // Añadir la tarjeta de "Crear nueva rutina" al final de la lista de rutinas del usuario
  const workoutsWithCreateNew = [...userWorkouts, { isCreateNew: true }];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bienvenido a FitApp</Text>
      <Text style={styles.sectionSubtitle}>Ejercicios en Tendencia</Text>

      <View style={styles.flashListContainer}>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
          <FlashList
            data={trendingExercises}
            renderItem={({ item }) => <ExerciseCard exercise={item} />}
            estimatedItemSize={150}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <Text style={styles.sectionSubtitle}>Mis Rutinas</Text>

      <View style={styles.flashListContainer}>
        <View style={{ height: 200, width: Dimensions.get("screen").width }}>
          <FlashList
            data={workoutsWithCreateNew}
            renderItem={({ item }) => (
              <WorkoutCard workout={item} isCreateNew={item.isCreateNew} />
            )}
            estimatedItemSize={150}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
    flexGrow: 0,
    marginBottom: 20, // Añadir margen inferior para separar las listas
  },
});

export default Home;