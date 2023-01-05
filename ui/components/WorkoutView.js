import { useState, useEffect } from 'react'
import CheckBox from 'expo-checkbox'
import Modal from './Modal.js'
import api from '../api.js'
import { 
	StyleSheet, 
	Button, 
	View, 
	Text, 
	TextInput 
} from 'react-native'

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
	},
	weightField: {
		marginLeft: 'auto',
	},
}) 

const WorkoutList = (props) => {
	const [workouts, setWorkouts] = useState([])
	const [exercises, setExercises] = useState([])
	const [workout, setWorkout] = useState(null)
	const selectWorkout = async (workout) => {
		try {
			const exerciseResponse = await Promise.all(
			workout.exercises.map(async (exercise) => {
				return await api.getExerciseById(exercise.exerciseId)
			}))
			setExercises(exerciseResponse)
			setWorkout(workout)
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
		return <View 
						style={styles.container} 
						key={workout._id}>
				<Text 
				key={workout.name} 
				onPress={
					async () => await selectWorkout(workout)}>
					{workout.name}
				</Text>
				<View style={styles.editButton}>
					<Button
					title="Edit"
					onPress={
						() => props.openEditWorkoutForm(workout)}/>
				</View>
				<View style={styles.deleteButton}>
					<Button
					title="Delete"
					onPress={
						() => api.deleteWorkoutById(workout._id)
						.catch(error => console.log('ERROR' + error))
					}/>
				</View>
			</View>
		})

	return <View>
		<Text style={{fontWeight: 'bold', fontSize: 20}}>
			Workouts
		</Text>
		{listItems}
		<Text></Text>
		<Text style={{fontWeight: 'bold', fontSize: 20}}>
			{workout?.name}
		</Text>
		<WorkoutExerciseForm exercises={exercises}/>
	</View>
} 

const WorkoutExerciseForm = (props) => {
	const setExerciseWeight = (exercise, weight) => {
		if (weight !== "") {
			exercise.weight = Number(weight)
			api.updateExercise(
				exercise._id, 
				exercise.name, 
				Number(weight)
			).catch(error => console.log(error))
		}
	}
	
	const listExercises = props.exercises.map(
		(exercise) => {
			return <WorkoutExercise 
							key={exercise._id} 
							exercise={exercise}
							setExerciseWeight={setExerciseWeight}
			/>
		})
	return <View>{listExercises}</View>
}

const WorkoutExercise = (props) => {
		const [
			weight, 
			setWeight
		]= useState(props.exercise.weight.toString())

		const onChanged = (text) =>{
						let newText = ''
						let numbers = '0123456789'

						for (var i=0; i < text.length; i++) {
								if(numbers.indexOf(text[i]) > -1 ) {
										newText = newText + text[i]
								}
								else {
										setWeight(text)
										alert("please enter numbers only")
								}
						}
						setWeight(newText)
						props.setExerciseWeight(props.exercise, newText)
		}
		
		return <View 
				style={styles.container} 
				key={props.exercise._id}>
			<Text>
				{props.exercise.name}
			</Text>
			<TextInput
			style={{
				height: 30, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
				marginLeft: 'auto',
				width: 40,
			}}
			onChangeText={text => onChanged(text)}
			value={weight}
			placeholder=" lbs"/>
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
			await api.updateWorkout(response[1].insertedId, workoutName, exerciseIdArray)
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
	const [exerciseIds, setExerciseIds] = useState(
		new Set(props.workout.exercises.map(exercise => exercise.exerciseId))
	)

	const submitForm = () => {
		api.updateWorkout(props.workout._id, workoutName, Array.from(
			exerciseIds
		)).catch(error => console.log(error))
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
const [selectedWorkout, setSelectedWorkout] = useState(null)

const [
	workoutModalIsVisible, 
	showWorkoutModal
] = useState(false)

const [
	exerciseModalIsVisible, 
	showExerciseModal
] = useState(false)

const openEditWorkoutForm = (workout) => {
	setSelectedWorkout(workout)
	showExerciseModal(true)
}

return <View>
{!exerciseModalIsVisible ? <Modal 
	buttonText="Add Workout" 
	modalIsVisible={workoutModalIsVisible}
	showModal={showWorkoutModal}
	content={<AddWorkoutForm 
		close={() => showWorkoutModal(false)}
	/>}
/>: null}

<Modal 
	modalIsVisible={exerciseModalIsVisible}
	showModal={showExerciseModal}
	content={<EditWorkoutForm 
		close={() => showExerciseModal(false)} 
		workout={selectedWorkout}
	/>}
/>

{workoutModalIsVisible || exerciseModalIsVisible? null : 
<WorkoutList openEditWorkoutForm={openEditWorkoutForm}/>}
</View>
}

