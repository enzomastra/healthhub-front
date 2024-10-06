import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { backgrounds, images } from '../constants';
import { tailwind } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={backgrounds.home}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
           
            <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 16, marginTop: 10 }}>
              <Image 
                source={images.logo}
                style={{ width: 130, height: 84 }}
                resizeMode='contain'
              />
            </View>

           
            <View style={{ flex: 1 }} />

           
            <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 32 }}>
              
              <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
                The Ultimate Fitness Experience
              </Text>

              
              <CustomButton
                title={'Sign In'}
                handlePress={() => navigation.navigate('SignIn')}
                containerStyles={[tailwind.wFull, tailwind.py4, tailwind.roundedFull, tailwind.mt4, { backgroundColor: '#F05219' }]}
                textStyles={{ color: 'white', fontWeight: '600' }}
              />

            </View>

          </ScrollView>

        </SafeAreaView>

      </ImageBackground>
    </GestureHandlerRootView>
  );
}
