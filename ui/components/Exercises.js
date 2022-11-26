import { View, Button, Text } from 'react-native'
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

	const listItems = exercises.map((exercise) => <Text key={exercise.name}>{exercise.name}</Text>)
	return <View>
		<Text>Exercises</Text>
		{listItems}
	</View>
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
			placeholder="Insert your text!"/>
			<Button
			title="Save"
			onPress={() => submitExerciseForm(textInputValue)}/>
		</View>
  );
}

export default () => {
	return <View>
		<Text>Add Exercise</Text>
		<AddExerciseForm/>
		<ExerciseList/>
	</View>
}
