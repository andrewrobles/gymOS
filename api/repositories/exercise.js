const base = require('./base')

module.exports = (db) => {
	const exerciseRepository = base.repository(db.collection('exercises'))
	const workoutRepository = base.repository(db.collection('workouts'))
	const deleteOneById = async (id) => {
		const [, exercise] = await exerciseRepository.findOneById(id)
		for (let i = 0; i < exercise.workouts.length; i++) {
			const [, workout] = await workoutRepository.findOneById(exercise.workouts[i])
			workout.exercises = workout.exercises.filter(x => x.toString() !== id.toString())
			await workoutRepository.updateOneById(workout._id, workout)
			const [, workoutAfter] = await workoutRepository.findOneById(exercise.workouts[i])
		}
		return await exerciseRepository.deleteOneById(id)
		
	}
	return {
		...exerciseRepository,
		deleteOneById
	}
}
