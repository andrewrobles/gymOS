import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native';
import Modal from './Modal.js'
import api from '../api.js'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	header: {
		fontWeight: "bold",
		fontSize: 20,
	},
	editButton: {
		marginLeft: 'auto',
		bottom: 11,
	},
	deleteButton: {
		bottom: 11,
	}
})

const ExerciseList = (props) => {
const [exercises, setExercises] = useState([])

useEffect(() => {
	api.getExercises()
	.then((data) => setExercises(data))
})

return <View>
		<Text style={styles.header}>Exercises</Text>
		{exercises.map((exercise) => <View 
				key={exercise._id} 
				style={styles.container}
			>
			<Text key={exercise.name}>{exercise.name}</Text>
			<View style={styles.editButton}>
				<Button 
				title="Edit"
				onPress={() => props.editExercise(exercise)}/>
			</View>
			<View style={styles.deleteButton}>
				<Button 
				title="Delete"
				onPress={() => api.deleteExerciseById(
					exercise._id
				)}/>
			</View>
		</View>)}
</View>}

const AddExerciseForm = (props) => {
const [textInputValue, setTextInputValue] = useState('');

const submitAndClearForm = () => {
	api.addExercise(textInputValue)
	.catch(error => console.log(error))
	setTextInputValue('')
	props.close()
}

return <View>
		<Text style={styles.header}>Add Exercise</Text>
		<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setTextInputValue(text)}
			value={textInputValue}
			placeholder=" Exercise name"
		/>
		<Button
			title="Save"
			onPress={async () => await submitAndClearForm()}
		/>
</View>}

const EditExerciseForm = (props) => {
const [
	textInputValue, 
	setTextInputValue
] = useState(props.selectedExercise.name);

const submitAndClearForm = () => {
	api.updateExercise(
		props.selectedExercise._id, 
		textInputValue,
		props.selectedExercise.weight
	)
	.catch(error => console.log(error))
	setTextInputValue('')
	props.close()
}

return <View>
		<Text style={styles.header}>Edit Exercise</Text>
		<TextInput
			style={{
				height: 40, 
				borderColor: 'gray', 
				borderWidth: 1,
				placeholderTextColor: 'gray',
			}}
			onChangeText={text => setTextInputValue(text)}
			value={textInputValue}
			placeholder=" Exercise name"
		/>
		<Button
			title="Save"
			onPress={() => submitAndClearForm()}
		/>
</View>}

export default function Exercises() {
const [selectedExercise, setSelectedExercise] = useState(null)
const [
	addExerciseModalIsVisible,
	showAddExerciseModal
] = useState(false)

const [
	editExerciseModalIsVisible,
	showEditExerciseModal
] = useState(false)

const editExercise = (exercise) => {
	showEditExerciseModal(true)
	setSelectedExercise(exercise)
}

return <View>
		{!editExerciseModalIsVisible ? <Modal
			buttonText="Add Exercise"
			modalIsVisible={addExerciseModalIsVisible}
			showModal={showAddExerciseModal}
			content={<AddExerciseForm
				close={() => showAddExerciseModal(false)}
			/>}
		/>: null}

		<Modal
			modalIsVisible={editExerciseModalIsVisible}
			showModal={showEditExerciseModal}
			content={<EditExerciseForm 
				close={() => showEditExerciseModal(false)}
				selectedExercise={selectedExercise}
			/>}
/>

{!editExerciseModalIsVisible && !addExerciseModalIsVisible ? 
<ExerciseList editExercise={editExercise}/> : null}
</View>
}
