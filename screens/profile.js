import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useAuth } from '../hooks/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchClientByEmail, updateClient } from '../api';


const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log('Error parsing JWT:', error);
    return null;
  }
};

const Profile = () => {
  const { logout } = useAuth();
  const [userData, setUserData] = useState({ name: '', weight: '', height: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);

  const getUserEmail = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken?.sub;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const email = await getUserEmail();
      if (email) {
        try {
          const clientData = await fetchClientByEmail(email);
          if (clientData) {
            setUserId(clientData.id);
            setUserData({
              name: clientData.name,
              weight: clientData.weight,
              height: clientData.height,
            });
          } else {
            console.error("Client data is null");
          }
        } catch (error) {
          console.log("Error fetching user data: ", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (userId) {
        await updateClient(userId, userData);
        Alert.alert('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Error updating profile');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />

      <Text style={styles.label}>Weight:</Text>
      <TextInput
        style={styles.input}
        value={userData.weight ? userData.weight.toString() : ''}
        editable={isEditing}
        keyboardType="numeric"
        onChangeText={(text) => setUserData({ ...userData, weight: parseFloat(text) || '' })}
      />

      <Text style={styles.label}>Height:</Text>
      <TextInput
        style={styles.input}
        value={userData.height ? userData.height.toString() : ''}
        editable={isEditing}
        keyboardType="numeric"
        onChangeText={(text) => setUserData({ ...userData, height: parseFloat(text) || '' })}
      />

      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
      )}
      
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#271F30',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
  },
});
