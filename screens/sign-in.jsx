import { View, Text, Image, StyleSheet, TextInput, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/AuthContext';

import { images } from '../constants';
import { icons } from '../constants';
import CustomButton from '../components/CustomButton';

const SignIn = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth(); // Trae la función login del contexto

  const submit = async (email, password) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://192.168.18.8:8000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Guarda el token y autentica
        await AsyncStorage.setItem('jwtToken', token);
        await login(token); // Llama a la función login del contexto

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image style={styles.logo} source={images.logo} />
        <Text style={styles.title}> Welcome Back!</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#8e8e93"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="password"
          placeholderTextColor="#8e8e93"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry={!passwordVisible}
        />

        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={passwordVisible ? icons.eyehide : icons.eye}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <CustomButton
        style={styles.button}
        title={'Sign In'}
        handlePress={() => submit(form.email, form.password)}
        isLoading={isSubmitting}
      />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#271F30',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: -270,
  },
  logo: {
    width: 115,
    height: 35,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#80F85',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 20,
  },
  passwordContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderColor: '#80F85',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#8e8e93',
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#8e8e93',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F05219',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  signUpText: {
    marginTop: 20,
    color: '#F05219',
    fontSize: 16,
  },
});
