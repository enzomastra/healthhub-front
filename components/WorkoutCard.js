import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutCard = ({ workout, isCreateNew }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (isCreateNew) {
      navigation.navigate('Workout');
    } else {
      navigation.navigate('WorkoutDetails', { workout });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {isCreateNew ? (
        <Text style={styles.createNewText}>Create a new Workout</Text>
      ) : (
        <>
          <Text style={styles.name}>{workout.name}</Text>
          <Text style={styles.description}>{workout.description}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    height: 150,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#e1e1e1',
    marginHorizontal: 2,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  createNewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F05219',
  },
});

export default WorkoutCard;