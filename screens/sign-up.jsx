import { View, Text, ScrollView, Image, StyleSheet, TextInput, StatusBar } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { images } from '../constants';
import { icons } from '../constants';
import CustomButton from '../components/CustomButton';

const SignUp = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    weight: '',
    height: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submit = async (name, email, password, weight, height) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://192.168.18.8:8000/auth/register', {
        name,
        email,
        password,
        weight,
        height,
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigation.navigate('SignIn');
      } else {
        console.log('Registration error:', response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image style={styles.logo} source={images.logo} />
        <Text style={styles.title}>  Create your account!</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="name"
        placeholderTextColor="#8e8e93"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

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

      <TextInput
        style={styles.input}
        placeholder="weight"
        placeholderTextColor="#8e8e93"
        value={form.weight}
        onChangeText={(text) => setForm({ ...form, weight: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="height"
        placeholderTextColor="#8e8e93"
        value={form.height}
        onChangeText={(text) => setForm({ ...form, height: text })}
      />

      <CustomButton
        style={styles.button}
        title={'Sign Up'}
        handlePress={() => submit(form.name, form.email, form.password, form.weight, form.height)}
        isLoading={isSubmitting}
      />

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signUpText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
    marginTop: -50,
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
