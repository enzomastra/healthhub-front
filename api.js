import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_URL_AUTH = "http://192.168.18.8:8000/auth";
const API_URL_EXERCISES = "http://192.168.18.8:8000/exercise";
const API_URL_WORKOUT = "http://192.168.18.8:8000/workout";
const API_URL_CLIENT = "http://192.168.18.8:8000/client";

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

    const response = await axios.get(`${API_URL_EXERCISES}/search?query=${query}`, {
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

    const response = await axios.get(`${API_URL_EXERCISES}/search?query=${exerciseName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const removeExerciseFromWorkout = async (exerciseId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.delete(`${API_URL_EXERCISES}/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error removing exercise from workout:', error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.delete(`${API_URL_WORKOUT}/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

export const updateWorkout = async (workoutId, name, description) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`${API_URL_WORKOUT}/${workoutId}`, 
      { name, description }, // Solo pasamos el nombre y la descripción
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const fetchWorkoutDetails = async (workoutId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${API_URL_WORKOUT}/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Workout details:', error);
    throw error;
  }
};

export const fetchClientByEmail = async (email) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL_CLIENT}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching client details:', error);
    throw error;
  }
};

export const updateClient = async (userId, data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    console.log('Updating client:', data);
    console.log('Token:', token);
    console.log('User ID:', userId);
    console.log('API URL:', `${API_URL_CLIENT}/${userId}`);

    const response = await axios.put(`${API_URL_CLIENT}/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};