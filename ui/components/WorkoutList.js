import { StyleSheet, Button, View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from '../api.js'


const styles = StyleSheet.create({
	deleteButton: {
		marginLeft: 'auto',
		bottom: 29,
	}
}) 

export default function WorkoutList() {
	const [workouts, setWorkouts] = useState([])
	const [exercises, setExercises] = useState([])
	const selectWorkout = async (workout) => {
		try {
			const exerciseResponse = await Promise.all(
			workout.exercises.map(async (exerciseId) => {
				return await api.getExerciseById(exerciseId)
			}))
			let names = []
			for (let i=0; i < exerciseResponse.length; i++) {
				names.push(exerciseResponse[i].name)
			}
			setExercises(names)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
	})

	const listItems = workouts.map((workout) => {
		return <View key={workout._id}>
				<Text 
				key={workout.name} 
				onPress={async () => await selectWorkout(workout)}>{workout.name}
				</Text>
				<View style={styles.deleteButton}>
					<Button
					title="Delete"
					onPress={() => api.deleteWorkoutById(workout._id)}/>
				</View>
			</View>
		})
	const listExercises = exercises.map((exercise) => {
		return <Text key={exercise._id}>{exercise}</Text>
		})

	return <View>
		<Text style={{fontWeight: 'bold', fontSize: 20}}>Workouts</Text>
		{listItems}
		<Text></Text>
		{listExercises}
		</View>
}
