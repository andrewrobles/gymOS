const getExercises = async () => {
	const options = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch('http://localhost:5000/exercises', options)
	return response.json()	
}

const addExercise = async (exerciseName) => {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "name": exerciseName})
	};
	const response = await fetch('http://localhost:5000/exercises', options)
	return response.json()
}

const getWorkouts = async () => {
	const options = {
		method: 'GET', 
		headers: { 'Content-Type': 'application/json' },
	};      
	const response = await fetch('http://localhost:5000/workouts', options)
	return response.json() 
}    

const addWorkout = async (workoutName, exerciseIds) => {
	const body = {
		name: workoutName,
		exercises: Array.from(exerciseIds)	
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	const response = await fetch('http://localhost:5000/workouts', options)
	return response.json()
}

module.exports = { getExercises, addExercise, getWorkouts, addWorkout }
