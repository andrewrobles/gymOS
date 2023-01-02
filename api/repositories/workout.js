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
	const deleteOneById = async (workoutId) => {
		const [,workout] = await workoutRepository.findOneById(workoutId)
		for (let i=0; i<workout.exercises.length; i++) {
			const [,exercise] = await exerciseRepository.findOneById(workout.exercises[i])
			const workoutIdIndex = exercise.workouts.map(x=>x.toString())
						       .indexOf(workout._id.toString())
			if (workoutIdIndex > -1) {
				exercise.workouts.splice(workoutIdIndex, 1)
				await exerciseRepository.updateOneById(exercise._id, exercise)
			}	
		}
		await workoutRepository.deleteOneById(workoutId)
	}

	const updateOneById = async (workoutId, workout) => {
		const [,workoutBefore] = await workoutRepository
		.findOneById(workoutId)

		for (let i=0; i<workoutBefore.exercises.length; i++) {
			const [,exercise] = await exerciseRepository
			.findOneById(workoutBefore.exercises[i])

			exercise.workouts = exercise.workouts.filter(
				w => {return w.toString() != workoutId.toString()}
			)

			await exerciseRepository.updateOneById(
				exercise._id, 
				exercise
		 )}

		for (let i=0; i<workout.exercises.length; i++) {
			const [,exercise] = await exerciseRepository
			.findOneById(workout.exercises[i])
			exercise.workouts.push(workoutId)

			await exerciseRepository
			.updateOneById(exercise._id, exercise)	
		}
		const updatedWorkout = {
			name: workout.name,
			exercises: workout.exercises.map((id, i) => {
				return {
					exerciseId: id,
					ordinal: i	
				}
			})
		} 
		await workoutRepository.updateOneById(
			workoutId, 
		  updatedWorkout	
		)
	}

	return {
		...workoutRepository,
		updateOneById,
		deleteOneById,
		addExercise,
	}
}
