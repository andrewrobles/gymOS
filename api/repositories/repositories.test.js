const MongoClient = require('mongodb').MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server')
const base = require('./base')

let mongoServer
let database
let connection

beforeEach(async () => {
	mongoServer = await MongoMemoryServer.create({instance: {dbName: 'gym'}})
	const mongoUri = mongoServer.getUri()
	connection = await MongoClient.connect(mongoUri)
	database = await connection.db('gym')
})

afterEach(async () => {
	await database.dropDatabase()
	await connection.close()
  	await mongoServer.stop()
})

describe('base', () => {
  it('repository adds helper functions', async () => {
    const pokemonCollection = base.repository(database.collection('pokemon'))

    expect(pokemonCollection).toHaveProperty('collection')
    expect(pokemonCollection).toHaveProperty('findOne')
    expect(pokemonCollection).toHaveProperty('findOneById')
    expect(pokemonCollection).toHaveProperty('getMany')
    expect(pokemonCollection).toHaveProperty('deleteOne')
    expect(pokemonCollection).toHaveProperty('deleteOneById')
    expect(pokemonCollection).toHaveProperty('insertOne')
    expect(pokemonCollection).toHaveProperty('insertMany')
    expect(pokemonCollection).toHaveProperty('updateOne')
    expect(pokemonCollection).toHaveProperty('updateOneById')
    expect(pokemonCollection).toHaveProperty('updateMany')
    expect(pokemonCollection).toHaveProperty('deleteAll')
    expect(pokemonCollection).toHaveProperty('deleteMany')
    expect(pokemonCollection).toHaveProperty('countDocuments')
    expect(pokemonCollection).toHaveProperty('aggregate')
    expect(pokemonCollection).toHaveProperty('bulkUpdateManyById')
  })
})

describe('exercise repository', () => {
	it('gets exercises', async () => {
		const exerciseRepository = require('./exercise')(database)
		await exerciseRepository.insertOne({})	
		exercises = await exerciseRepository.getMany()
		expect('_id' in exercises[0]).toEqual(true)
		expect('createDate' in exercises[0]).toEqual(false)
	})
	it('deletes exercise', async () => {
		const exerciseRepository = require('./exercise')(database)
		await exerciseRepository.insertOne({name: 'exerciseA'})	
		exercises = await exerciseRepository.getMany()
		const workoutRepository = require('./workout')(database)
		await workoutRepository.insertOne({name: 'workoutA', exercises: [exercises[0]._id]})	
		workouts = await workoutRepository.getMany()
		exercises[0].workouts = [workouts[0]._id]
		await exerciseRepository.updateOneById(exercises[0]._id, exercises[0])
		await exerciseRepository.deleteOneById(exercises[0]._id)
		const exercisesAfter = await exerciseRepository.getMany()
		const workoutsAfter = await workoutRepository.getMany()	
		expect(exercisesAfter.length).toEqual(0)
		expect(workoutsAfter[0].exercises).toEqual([])
	})
})

describe('workout repository', () => {
	it('gets workouts', async () => {
		const workoutRepository = require('./workout')(database)
		await workoutRepository.insertOne({})	
		workouts = await workoutRepository.getMany()
		expect('_id' in workouts[0]).toEqual(true)
		expect('createDate' in workouts[0]).toEqual(false)
	})
	it('adds exercise', async () => {
		const workoutRepository = require('./workout')(database)
		const exerciseRepository = require('./exercise')(database)
		await exerciseRepository.insertOne({name: 'exerciseA', workouts: []})	
		await workoutRepository.insertOne({name: 'workoutA', exercises: []})	
		const workoutsBefore = await workoutRepository.getMany()
		const exercisesBefore = await exerciseRepository.getMany()
		await workoutRepository.addExercise(workoutsBefore[0]._id, exercisesBefore[0]._id)
		const workoutsAfter = await workoutRepository.getMany()
		const exercisesAfter = await exerciseRepository.getMany()
		expect(workoutsAfter[0].exercises).toEqual([exercisesAfter[0]._id])
		expect(exercisesAfter[0].workouts).toEqual([workoutsAfter[0]._id])
	})
	it('deletes workout', async () => {
		const exerciseRepository = require('./exercise')(database)
		await exerciseRepository.insertOne({name: 'exerciseA'})	
		exercises = await exerciseRepository.getMany()
		const workoutRepository = require('./workout')(database)
		await workoutRepository.insertOne({name: 'workoutA', exercises: [exercises[0]._id]})	
		workouts = await workoutRepository.getMany()
		exercises[0].workouts = [workouts[0]._id]
		await exerciseRepository.updateOneById(exercises[0]._id, exercises[0])
		await workoutRepository.deleteOneById(workouts[0]._id)
		const exercisesAfter = await exerciseRepository.getMany()
		const workoutsAfter = await workoutRepository.getMany()	
		expect(workoutsAfter.length).toEqual(0)
		expect(exercisesAfter[0].workouts).toEqual([])
	})
	it('updates workout', async() => {
		const workoutRepository = require('./workout')(database)
		await workoutRepository.insertOne({name: 'workoutA', exercises: []})	
		const exerciseRepository = require('./exercise')(database)
		await exerciseRepository.insertOne({name: 'exerciseA', workouts: []})	
		await exerciseRepository.insertOne({name: 'exerciseB', workouts: []})	
		const exercisesBefore = await exerciseRepository.getMany()
		const workoutsBefore = await workoutRepository.getMany()
		await workoutRepository.updateOneById(workoutsBefore[0]._id, { 
			name: 'workoutB', 
			exercises: [exercisesBefore[0]._id] 
		})
		const workoutsAfter = await workoutRepository.getMany()
		expect(workoutsAfter[0].name).toEqual('workoutB')
		const exercisesAfter = await exerciseRepository.getMany()
		console.log(exercisesAfter[0])
		expect(exercisesAfter[0].workouts).toEqual([workoutsBefore[0]._id])
	})
})
