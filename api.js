import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_URL_AUTH = "http://192.168.18.8:8000/auth";
const API_URL_EXERCISES = "http://192.168.18.8:8000/exercise/search?query=";
const API_URL_WORKOUT = "http://192.168.18.8:8000/workout";

export const handleLogin = async (form, setIsSubmitting, login, navigation) => {
  setIsSubmitting(true);
  try {
    const response = await axios.post(`${API_URL_AUTH}/login`, form);

    if (response.status === 200) {
      const { token } = response.data;

      await AsyncStorage.setItem('token', token);
      await login(token);

      Alert.alert(
        'Login Successful',
        'Welcome back!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log('Authentication error:', response.data.message);
    }
  } catch (error) {
    console.error('Authentication error:', error.response ? error.response.data : error.message);
  } finally {
    setIsSubmitting(false);
  }
};

export const handleSignUp = async (form, setIsSubmitting, navigation) => {
  setIsSubmitting(true);
  try {
    const response = await axios.post(`${API_URL_AUTH}/register`, form);

    if (response.status === 200) {
      Alert.alert(
        'Registration Successful',
        'You can now log in with your new account.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log('Registration error:', response.data.message);
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
  } finally {
    setIsSubmitting(false);
  }
};

export const fetchExercises = async (query = '') => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL_EXERCISES}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response data');
    }
    
    const filteredExercises = response.data.filter(exercise => 
      exercise && exercise.name && exercise.muscle && exercise.instructions
    );

    return filteredExercises;
  } catch (error) {
    throw error;
  }
};

export const fetchUserWorkouts = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL_WORKOUT}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response data');
    }

    const filteredWorkouts = response.data.filter(workout => 
      workout && workout.name && workout.description && workout.exercises
    );

    return filteredWorkouts;
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    throw error;
  }
};

export const saveWorkout = async (workout) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(`${API_URL_WORKOUT}/save`, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving workout:', error);
    throw error;
  }
};

export const addExerciseToWorkout = async (workoutId, exerciseName) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(`${API_URL_WORKOUT}/${workoutId}/add/${encodeURIComponent(exerciseName)}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding exercise to workout:', error);
    throw error;
  }
}

export const fetchExerciseDetails = async (exerciseName) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL_EXERCISES}${exerciseName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('url:', `${API_URL_EXERCISES}${exerciseName}`);

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response data');
    }

    const exerciseDetails = response.data[0];
    return exerciseDetails;
  } catch (error) {
    console.error('Error fetching exercise details:', error);
    throw error;
  }
};

export const fetchWorkoutDetails = async (workoutId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token); // Añadir este log
    if (!token) {
      throw new Error('No token found');
    }
    console.log('Making request to:', `${API_URL_WORKOUT}/${workoutId}`);
    const response = await axios.get(`${API_URL_WORKOUT}/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching workout details:', error);
    throw error;
  }
};