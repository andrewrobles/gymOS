import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from '../api.js'

export default function WorkoutList() {
	const [workouts, setWorkouts] = useState([])
	const [exercises, setExercises] = useState([])
	const selectWorkout = async (workout) => {
		console.log('selectWorkout ' + workout._id)
		console.log(workout.exercises)
		try {
			const exerciseResponse = await Promise.all(
			workout.exercises.map(async (exerciseId) => {
				return await api.getExerciseById(exerciseId)
			}))
			let names = []
			for (let i=0; i < exerciseResponse.length; i++) {
				names.push(exerciseResponse[i][1].name)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((workout) => {
		return <Text 
			key={workout.name} 
			onPress={async () => await selectWorkout(workout)}>{workout.name}</Text>
		})

	return <View><Text>Workouts</Text>{listItems}</View>
}
