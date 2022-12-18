import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from '../api.js'

export default function WorkoutList() {
	const [workouts, setWorkouts] = useState([])
	const selectWorkout = (workout) => {
		console.log('selectWorkout ' + workout._id)
		console.log(workout.exercises)
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((workout) => {
		return <Text 
			key={workout.name} 
			onPress={() => selectWorkout(workout)}>{workout.name}</Text>
		})

	return <View><Text>Workouts</Text>{listItems}</View>
}
