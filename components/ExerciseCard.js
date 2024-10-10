import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ExerciseCard = ({ exercise }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.muscle}>{exercise.muscle}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    padding: 30,
    height: 120,
    width: 200,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#e1e1e1',
    marginHorizontal: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  muscle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExerciseCard;
