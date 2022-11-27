import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import AddWorkout from './components/AddWorkout.js'
import Exercises from './components/Exercises.js'
import Workouts from './components/Workouts.js'

const styles = StyleSheet.create({
	container: {
		margin: 30,
	},
	navbar: {
		flexDirection: 'row',
	},
});

const Navbar = (props) => {
	const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)
	return <View style={styles.navbar}>{Object.keys(props.views).map(key => (
			<Button
			key={key}
			title={capitalize(key)}
			onPress={() => props.setSelectedViewKey(key)}/>
	))}</View>
}

export default function App() {
	const [selectedViewKey, setSelectedViewKey] = useState('exercises')
	const views = {
		exercises: <Exercises/>,
		workouts: <Workouts/>,
	}
	return <View style={styles.container}>
		{views[selectedViewKey]}
		<Navbar 
		views={views}
		setSelectedViewKey={setSelectedViewKey}/>	
	</View>
}
