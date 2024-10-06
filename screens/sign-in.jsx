import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'tailwindcss-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { images } from '../constants';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (email, password) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://192.168.18.8:8000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Guardar el JWT en AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);
        console.log('JWT saved:', token);
      } else {
        console.log('Authentication error:', response.data.message);
      }
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false); // Volver el botón a su estado original
    }
  };

  return (
    <SafeAreaView className="bg-secondary-purple h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[82vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-white font-ppblack text-2xl mt-6 mb-6">
            Welcome back!
          </Text>

          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title={'Sign In'}
            handlePress={() => submit(form.email, form.password)}
            containerStyles="w-full bg-secondary-bridge py-4 rounded-full"
            textStyles="text-white font-semibold"
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-lg text-white font-semibold text-base mb-6">
              Don't have an account?
            </Text>
            {/* <Link href="/sign-up" className='text-lg font-semibold text-secondary-bridge'> Sign Up </Link> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
