import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import CheckBox from 'expo-checkbox'
import api from '../api.js'

const styles = StyleSheet.create({
	exerciseCheckbox: {
		flexDirection: 'row',
	}
})

const ExerciseCheckboxes = (props) => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		api.getExercises()
		.then((data) => setExercises(data))
	})

	const listItems = exercises.map((exercise) => <ExerciseCheckbox 
		key={exercise.name}
		exercise={exercise}
		exerciseIds={props.exerciseIds}
		setExerciseIds={props.setExerciseIds}/>)
	return <View>{listItems}</View>
}

const ExerciseCheckbox = (props) => {
	const [isChecked, setChecked] = useState(false)
	const onValueChange = (checkboxValue) => {
		setChecked(checkboxValue)
		if (checkboxValue) {
			props.exerciseIds.add(props.exercise._id)
		} else {
			props.exerciseIds.delete(props.exercise._id)
		}
		props.setExerciseIds(props.exerciseIds)
	}
	return <View style={styles.exerciseCheckbox}>
		<CheckBox value={isChecked} onValueChange={onValueChange}/>
		<Text>{props.exercise.name}</Text>
	</View>
}

const AddWorkoutForm = (props) => {
	const [workoutName, setWorkoutName] = useState('')
	const [exerciseIds, setExerciseIds] = useState(new Set())

	const submitForm = () => {
		api.addWorkout(workoutName, Array.from(exerciseIds))
		props.close()
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
			onChangeText={text => setWorkoutName(text)}
			value={workoutName}
			placeholder="Insert your text!"/>
			<ExerciseCheckboxes
			exerciseIds={exerciseIds}
			setExerciseIds={setExerciseIds}/>
			<Button
			title="Save"
			onPress={() => submitForm()}/>
		</View>
  );
}

export default function AddWorkout(props) {
	return <View>
		<Text>Add Workout</Text>
		<AddWorkoutForm close={props.close}/>
	</View>
}
