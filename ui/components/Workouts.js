import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import CheckBox from 'expo-checkbox'

const ExerciseCheckboxes = (props) => {
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

	const listItems = exercises.map((exercise) => <ExerciseCheckbox 
		key={exercise.name}
		exercise={exercise}
		selectedExercises={props.selectedExercises}
		setSelectedExercises={props.setSelectedExercises}/>)
	return <View>{listItems}</View>
}

const ExerciseCheckbox = (props) => {
	const [isChecked, setChecked] = useState(false)
	const onValueChange = (checkboxValue) => {
		setChecked(checkboxValue)
		if (checkboxValue) {
			props.selectedExercises.add(props.exercise._id)
		} else {
			props.selectedExercises.delete(props.exercise._id)
		}
		props.setSelectedExercises(props.selectedExercises)
	}
	return <View>
		<Text>{props.exercise.name}</Text>
		<CheckBox value={isChecked} onValueChange={onValueChange}/>
	</View>
}

const AddWorkoutForm = () => {
	const [textInputValue, setTextInputValue] = useState('')
	const [selectedExercises, setSelectedExercises] = useState(new Set())

	const submitForm = () => {
		const requestBody = {
			name: textInputValue,
		 	exerciseIds: Array.from(selectedExercises)	
		}
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
		fetch('http://localhost:5000/workout/add', requestOptions)
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
			<ExerciseCheckboxes
			selectedExercises={selectedExercises}
			setSelectedExercises={setSelectedExercises}/>
			<Button
			title="Save"
			onPress={() => submitForm()}/>
		</View>
  );
}

const WorkoutList = () => {
	const [workouts, setWorkouts] = useState([])
	const selectWorkout = () => {
		console.log('selectWorkout')
	}

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('http://localhost:5000/workout', requestOptions)
		.then(response => response.json())
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((exercise) => <Text key={exercise.name} onPress={selectWorkout}>{exercise.name}</Text>)
	return <View>
		<Text>Workouts</Text>
		{listItems}
	</View>
}

export default () => {
	return <View>
		<Text>Add Workout</Text>
		<AddWorkoutForm/>
		<WorkoutList/>
	</View>
}
