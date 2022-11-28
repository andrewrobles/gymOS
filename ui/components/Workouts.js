import { useState } from 'react'
import { View, Button } from 'react-native'
import AddWorkout from './AddWorkout.js'
import WorkoutList from './WorkoutList.js'

export default function Workouts() {
	const [showAddWorkout, setShowAddWorkout] = useState(false)
	return <View>
		{showAddWorkout ? 
		<Button title="Go Back" onPress={() => setShowAddWorkout(false)}/>: 
		<Button title="Add Workout" onPress={() => setShowAddWorkout(true)}/>}
		{showAddWorkout ? <AddWorkout/>: null}
		{showAddWorkout ? null : <WorkoutList/>}
	</View>
}
