import { StyleSheet, View, Button, Text } from 'react-native'
import CheckBox from 'expo-checkbox'
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

const ExerciseView = () => {
	return <View>
		<Text>Add Exercise</Text>
		<AddExerciseForm/>
		<ExerciseList/>
	</View>
}

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

const WorkoutView = () => {
	return <View>
		<Text>Add Workout</Text>
		<AddWorkoutForm/>
	</View>
}

const Navbar = (props) => {
	return <View>
			<Button 
			title="Workouts"
			onPress={() => props.setSelectedViewKey('workoutView')}/>
			<Button 
			title="Exercises"
			onPress={() => props.setSelectedViewKey('exerciseView')}/>
	</View>
}

export default function App() {
	const [selectedViewKey, setSelectedViewKey] = useState('workoutView')
	const views = {
		exerciseView: <ExerciseView/>,
		workoutView: <WorkoutView/>
	}
	const selectedView = views[selectedViewKey]
	return <View style={styles.container}>
		{selectedView}
		<Navbar setSelectedViewKey={setSelectedViewKey}/>	
	</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		margin: 30,
	},
});
