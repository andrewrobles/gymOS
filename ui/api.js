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

const addWorkout = async (workoutName) => {
	const body = {
		name: workoutName,
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	const [,response] = await fetch('http://localhost:5000/workouts', options)
	return response.json()
}

const addExerciseToWorkout = async (workoutId, exerciseId) => {
	const body = {
		exerciseId
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	const response = await fetch(`http://localhost:5000/workouts/${workoutId}/exercises`, options)
	return response.json()
}

module.exports = { 
	addExerciseToWorkout,
	getExercises, 
	addExercise, 
	getWorkouts, 
	addWorkout 
}
