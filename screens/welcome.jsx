import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { backgrounds, images } from '../constants';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <ImageBackground
        source={backgrounds.home}
        style={styles.flexOne}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.flexOne}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={images.logo}
                style={styles.logo}
                resizeMode='contain'
              />
            </View>

            <View style={styles.flexOne} />

            <View style={styles.bottomContainer}>
              <Text style={styles.title}>
                The Ultimate Fitness Experience
              </Text>

              <CustomButton
                title={'Sign In'}
                handlePress={() => navigation.navigate('SignIn')}
              />
              
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  logo: {
    width: 130,
    height: 84,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  
});
