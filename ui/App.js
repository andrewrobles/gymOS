import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import Exercises from './components/Exercises.js'
import Workouts from './components/Workouts.js'

const styles = StyleSheet.create({
	container: {
		margin: 30,
	},
});

const Navbar = (props) => {
	const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)
	return <View>{Object.keys(props.views).map(key => (
			<Button
			title={capitalize(key)}
			onPress={() => props.setSelectedViewKey(key)}/>
	))}</View>
}

export default function App() {
	const [selectedViewKey, setSelectedViewKey] = useState('workouts')
	const views = {
		exercises: <Exercises/>,
		workouts: <Workouts/>
	}
	return <View style={styles.container}>
		{views[selectedViewKey]}
		<Navbar 
		views={views}
		setSelectedViewKey={setSelectedViewKey}/>	
	</View>
}
