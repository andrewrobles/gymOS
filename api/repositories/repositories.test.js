const MongoClient = require('mongodb').MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server')
const base = require('./base')

let mongoServer
let database
let connection

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create({instance: {dbName: 'gym'}})
	const mongoUri = mongoServer.getUri()
	connection = await MongoClient.connect(mongoUri)
	database = await connection.db('gym')
})

afterAll(async () => {
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
		expect('createDate' in exercises[0]).toEqual(true)
	})
})

describe('workout repository', () => {
	it('gets workouts', async () => {
		const workoutRepository = require('./workout')(database)
		await workoutRepository.insertOne({})	
		workouts = await workoutRepository.getMany()
		expect('_id' in workouts[0]).toEqual(true)
		expect('createDate' in workouts[0]).toEqual(true)
	})
})
