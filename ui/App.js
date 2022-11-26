import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import ExerciseView from './components/ExerciseView.js'
import WorkoutView from './components/WorkoutView.js'

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
