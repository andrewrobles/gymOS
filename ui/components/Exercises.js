import { View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import { getExercises, addExercise } from '../api.js'

const ExerciseList = () => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		getExercises()
		.then((data) => setExercises(data))
	})

	return <View>
		<Text>Exercises</Text>
		{exercises.map((exercise) => <Text key={exercise.name}>{exercise.name}</Text>)}
	</View>
}

const AddExerciseForm = () => {
	const [textInputValue, setTextInputValue] = useState('');

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
			onPress={() => addExercise(textInputValue)}/>
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
