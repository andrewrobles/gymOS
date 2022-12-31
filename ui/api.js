const getExercises = async () => {
	const options = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	try {
		const response = await fetch('http://localhost:5000/exercises', options)
		return response.json()	
	} catch (error) {
		return {message: error}
	}
}

const addExercise = async (exerciseName) => {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "name": exerciseName})
	};
	try {
		const response = await fetch('http://localhost:5000/exercises', options)
		return response.json()
	} catch (error) {
		return {message: error}
	}
}

const updateExercise = async (exerciseId, exerciseName) => {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "name": exerciseName})
	};
	try {
		const response = await fetch(`http://localhost:5000/exercises/${exerciseId}`, options)
		return response.json()
	} catch (error) {
		return {message: error}
	}
}

const updateWorkout = async (workoutId, workoutName, exercises) => {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ "name": workoutName, exercises})
	};
	fetch(`http://localhost:5000/workouts/${workoutId}`, options)
	.catch(error => console.log(error))
}

const getWorkouts = async () => {
	const options = {
		method: 'GET', 
		headers: { 'Content-Type': 'application/json' },
	};      
	try {
		const response = await fetch('http://localhost:5000/workouts', options)
		return response.json() 
	} catch (error) {
		return {message: error}
	}
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
	try {
		const response = await fetch('http://localhost:5000/workouts', options)
		return response.json()
	} catch (error) {
		return {message: error}
	}
}

const addExerciseToWorkout = async (exerciseId, workoutId) => {
	const body = {
		exerciseId
	}
	const options = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	try {
		const response = await fetch(`http://localhost:5000/workouts/${workoutId}/exercises`, options)
	} catch (error) {
		return {message: error}
	}
}

const getExerciseById = async (exerciseId) => {
	const options = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	try {
		const response = await fetch(`http://localhost:5000/exercises/${exerciseId}`, options)
		return response.json()
	} catch (error) {
		return {message: error}
	}
}

const deleteExerciseById = async (exerciseId) => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	try {
		const response = await fetch(`http://localhost:5000/exercises/${exerciseId}`, options)
		return response.json()
	} catch (error) {
		return { message: error}
	}
}

const deleteWorkoutById = async (workoutId) => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	try {
		const response = await fetch(`http://localhost:5000/workouts/${workoutId}`, options)
	} catch (error) {
		return {message: error}
	}
}

module.exports = { 
	addExerciseToWorkout,
	getExercises, 
	addExercise, 
	getWorkouts, 
	addWorkout,
	getExerciseById,
	deleteExerciseById,
	deleteWorkoutById,
	updateExercise,
	updateWorkout,
}
