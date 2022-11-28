import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from '../api.js'

export default function WorkoutList() {
	const [workouts, setWorkouts] = useState([])
	const selectWorkout = () => {
		console.log('selectWorkout')
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((exercise) => <Text key={exercise.name} onPress={selectWorkout}>{exercise.name}</Text>)
	return <View>
		<Text>Workouts</Text>
		{listItems}
	</View>
}
