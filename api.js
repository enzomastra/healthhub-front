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

export const fetchTrendingExercises = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL_EXERCISES}`, {
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
    console.error('Error fetching trending exercises:', error);
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

    console.log('Request Headers:', response.config.headers); // Verifica los encabezados de la solicitud
    console.log('Response Data:', response.data); // Verifica los datos de la respuesta

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response data');
    }

    // Filtrar rutinas que no tienen campos en null
    const filteredWorkouts = response.data.filter(workout => 
      workout && workout.name && workout.description && workout.exercises
    );

    return filteredWorkouts;
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    throw error;
  }
};