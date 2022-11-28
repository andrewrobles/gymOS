import { View } from 'react-native'
import AddWorkout from './AddWorkout.js'
import WorkoutList from './WorkoutList.js'

export default function Workouts() {
	return <View>
		<AddWorkout/>
		<WorkoutList/>
	</View>
}
