import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import AddWorkout from './AddWorkout.js'
import {getWorkouts} from '../api.js'

const WorkoutList = () => {
	const [workouts, setWorkouts] = useState([])
	const selectWorkout = () => {
		console.log('selectWorkout')
	}

	useEffect(() => {
		getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((exercise) => <Text key={exercise.name} onPress={selectWorkout}>{exercise.name}</Text>)
	return <View>
		<Text>Workouts</Text>
		{listItems}
	</View>
}

export default function Workouts() {
	return <View>
		<AddWorkout/>
		<WorkoutList/>
	</View>
}
