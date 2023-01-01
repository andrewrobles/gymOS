import { useState, useEffect } from 'react'
import { StyleSheet, Button, View, Text, TextInput } 
from 'react-native'
import CheckBox from 'expo-checkbox'
import Modal from './Modal.js'
import api from '../api.js'

const styles = StyleSheet.create({
	exerciseCheckbox: {
		flexDirection: 'row',
	},
	container: {
		flexDirection: 'row',
	},
	editButton: {
		marginLeft: 'auto',
		bottom: 11,
	},
	deleteButton: {
		bottom: 11,
	}
}) 

const WorkoutList = (props) => {
	const [workouts, setWorkouts] = useState([])
	const [exercises, setExercises] = useState([])
	const selectWorkout = async (workout) => {
		try {
			const exerciseResponse = await Promise.all(
			workout.exercises.map(async (exerciseId) => {
				return await api.getExerciseById(exerciseId)
			}))
			setExercises(exerciseResponse)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		api.getWorkouts()
		.then((data) => setWorkouts(data))
		.catch(error => console.log(error))
	})

	const listItems = workouts.map((workout) => {
		return <View style={styles.container} key={workout._id}>
				<Text 
				key={workout.name} 
				onPress={async () => await selectWorkout(workout)}>{workout.name}
				</Text>
				<View style={styles.editButton}>
					<Button
					title="Edit"
					onPress={() => props.openEditWorkoutForm(workout)}/>
				</View>
				<View style={styles.deleteButton}>
					<Button
					title="Delete"
					onPress={() => api.deleteWorkoutById(workout._id).catch(error => console.log('ERROR' + error))}/>
				</View>
			</View>
		})
	const listExercises = exercises.map((exercise) => {
		return <Text key={exercise._id}>{exercise.name}</Text>
		})

	return <View>
		<Text style={{fontWeight: 'bold', fontSize: 20}}>Workouts</Text>
		{listItems}
		<Text></Text>
		{listExercises}
		</View>
} 

const ExerciseCheckboxes = (props) => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		api.getExercises()
		.then((data) => setExercises(data))
	})

	const listItems = exercises.map((exercise) => <ExerciseCheckbox 
		key={exercise.name}
		exercise={exercise}
		exerciseIds={props.exerciseIds}
		setExerciseIds={props.setExerciseIds}/>)
	return <View>{listItems}</View>
}

const ExerciseCheckbox = (props) => {
	const [isChecked, setChecked] = useState(false)
	
	useEffect(() => {
		if (props.exerciseIds.has(props.exercise._id)) {
			setChecked(true)
		}
	})
	const onValueChange = (checkboxValue) => {
		setChecked(checkboxValue)
		if (checkboxValue) {
			props.exerciseIds.add(props.exercise._id)
		} else {
			props.exerciseIds.delete(props.exercise._id) 
		}
		props.setExerciseIds(props.exerciseIds)
	}
	return <View style={styles.exerciseCheckbox}>
		<CheckBox value={isChecked} onValueChange={onValueChange}/>
		<Text>{props.exercise.name}</Text>
	</View>
}

const AddWorkoutForm = (props) => {
	const [workoutName, setWorkoutName] = useState('')
	const [exerciseIds, setExerciseIds] = useState(new Set())

	const submitForm = async () => {
		const exerciseIdArray = Array.from(exerciseIds)
		try {
			const response = await api.addWorkout(workoutName)
			for (let i=0; i<exerciseIdArray.length; i++) {
				await api.addExerciseToWorkout(exerciseIdArray[i], response[1].insertedId)
			}
		} catch(error) {
			console.log(error)
		}
		props.close()
	}

	return (
		<View>
			<Text style={{fontWeight: 'bold', fontSize:20}}>Add Workout</Text>
			<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setWorkoutName(text)}
			value={workoutName}
			placeholder=" Workout name"/>
			<ExerciseCheckboxes
			exerciseIds={exerciseIds}
			setExerciseIds={setExerciseIds}/>
			<Button
			title="Save"
			onPress={async () => await submitForm()}/>
		</View>
  );
}

const EditWorkoutForm = (props) => {
	const [workoutName, setWorkoutName] = useState(props.workout.name)
	const [exerciseIds, setExerciseIds] = useState(new Set(props.workout.exercises))

	const submitForm = () => {
		api.updateWorkout(props.workout._id, workoutName, Array.from(exerciseIds))
		.catch(error => console.log(error))
		props.close()
	}

	return (
		<View>
			<Text style={{fontWeight: 'bold', fontSize:20}}>Edit Workout</Text>
			<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setWorkoutName(text)}
			value={workoutName}
			placeholder=" Workout name"/>
			<ExerciseCheckboxes
			exerciseIds={exerciseIds}
			setExerciseIds={setExerciseIds}/>
			<Button
			title="Save"
			onPress={() => submitForm()}/>
		</View>
  );
}

const AddWorkout = (props) => {
	return <View>
		<AddWorkoutForm close={props.close}/>
	</View>
}


export default function Workouts() {
const [showAddWorkout, setShowAddWorkout] = useState(false)
const [showEditWorkout, setShowEditWorkout] = useState(false)
const [selectedWorkout, setSelectedWorkout] = useState(null)

const openEditWorkoutForm = (workout) => {
	setSelectedWorkout(workout)
	setShowEditWorkout(true)
}

const hideForms = () => {
	setShowAddWorkout(false)	
	setShowEditWorkout(false)
}

const [modalIsVisible, setModalIsVisible] = useState(false)
const hideModal = () => setModalIsVisible(false)
const modalContent = <Text>Modal Content</Text>

return <View>
<Modal 
	buttonText="Add Workout" 
	modalIsVisible={modalIsVisible}
	modalContent={<AddWorkoutForm close={hideModal}/>}
	backgroundContent={<WorkoutList 
		openEditWorkoutForm={openEditWorkoutForm}
	/>}
/>
{showEditWorkout ? <EditWorkoutForm close={() => setShowEditWorkout(false)} workout={selectedWorkout}/>: null }
</View>
}

