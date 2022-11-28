const getExercises = async () => {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch('http://localhost:5000/exercise', requestOptions)
	return response.json()	
}

const addExercise = async (exerciseName) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "name": exerciseName})
	};
	const response = await fetch('http://localhost:5000/exercise/add', requestOptions)
	return response.json()
}

const getWorkouts = async () => {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	const reponse = await fetch('http://localhost:5000/workout', requestOptions)
	return response.json()
}

const addWorkout = async (workoutName, exerciseIds) => {
	const requestBody = {
		name: workoutName,
		exerciseIds: Array.from(exerciseIds)	
	}
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody)
	};
	const response = await fetch('http://localhost:5000/workout/add', requestOptions)
	return response.json()
}

module.exports = { getExercises, addExercise, getWorkouts, addWorkout }
