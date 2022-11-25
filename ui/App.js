import { StyleSheet, View, Button, Text } from 'react-native';
import { useState, useEffect } from 'react'

import { TextInput } from 'react-native';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
      fetch('http://localhost:5000/exercise', requestOptions)
          .then(response => response.json())
          .then((data) => setExercises(data))
  })

  const listItems = exercises.map((exercise) => <Text key={exercise.name}>{exercise.name}</Text> )
  return <View>{listItems}</View>
}

const AddExerciseForm = () => {
  const [textInputValue, setTextInputValue] = useState('');

  const submitExerciseForm = (exerciseName) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": exerciseName})
      };
      fetch('http://localhost:5000/exercise/add', requestOptions)
          .then(response => response.json())
  }

  return (
    <View>
    <TextInput
    style={{ 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    placeholderTextColor: 'gray',
  }}
    onChangeText={text => setTextInputValue(text)}
    value={textInputValue}
  placeholder="Insert your text!"
  />
  <Button
  title="Press me"
  onPress={() => submitExerciseForm(textInputValue)}/>
  </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <AddExerciseForm/>
      <ExerciseList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
