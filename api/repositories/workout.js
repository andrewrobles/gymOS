const base = require('./base')

module.exports = (db) => {
	const workoutRepository = base.repository(db.collection('workouts'))
	const exerciseRepository = base.repository(db.collection('exercises'))
	const addExercise = async (workoutId, exerciseId) => {
		const [,workout] = await workoutRepository.findOneById(workoutId)
		const [,exercise] = await exerciseRepository.findOneById(exerciseId)
		workout.exercises.push(exerciseId)
		exercise.workouts.push(workoutId)
		await workoutRepository.updateOneById(workoutId, workout)
		await exerciseRepository.updateOneById(exerciseId, exercise)
	}
	return {
		...workoutRepository,
		addExercise
	}
}
