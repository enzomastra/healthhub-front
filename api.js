import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_URL_AUTH = "http://192.168.18.8:8000/auth";

export const handleLogin = async (form, setIsSubmitting, login, navigation) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL_AUTH}/login`, form);
  
      if (response.status === 200) {
        const { token } = response.data;
  
        await AsyncStorage.setItem('jwtToken', token);
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