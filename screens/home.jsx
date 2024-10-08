import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#271F30',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;