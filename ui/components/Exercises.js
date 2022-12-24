import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import api from '../api.js'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	deleteButton: {
		fontSize: 5,
	},
	header: {
		fontWeight: "bold",
		fontSize: 20,
	},
	deleteButton: {
		marginLeft: 'auto',
		bottom: 11,
	}
})

const ExerciseList = () => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		api.getExercises()
		.then((data) => setExercises(data))
	})

	return <View>
		<Text style={styles.header}>Exercises</Text>
		{exercises.map((exercise) => <View style={styles.container}>
			<Text key={exercise.name}>{exercise.name}</Text>
			<View style={styles.deleteButton}>
				<Button 
				title="Delete"
				onPress={() => api.deleteExerciseById(exercise._id)}/>
			</View>
		</View>)}
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
			onPress={() => api.addExercise(textInputValue)}/>
		</View>
  );
}

export default function Exercises() {
	return <View>
		<Text style={styles.header}>Add Exercise</Text>
		<AddExerciseForm/>
		<ExerciseList/>
	</View>
}
