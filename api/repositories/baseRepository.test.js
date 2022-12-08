const MongoClient = require('mongodb').MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server')
const moongo = require('./baseRepository')

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

describe('moongo', () => {
  it('repository adds helper functions', async () => {
    const pokemonCollection = moongo.repository(database.collection('pokemon'))

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

describe('exerciseRepository', () => {
	it('gets exercises', async () => {
		const exerciseRepository = moongo.repository(database.collection('exercise'))
		await exerciseRepository.insertOne({})	
		exercises = await exerciseRepository.getMany()
		expect('_id' in exercises[0]).toEqual(true)
		expect('createDate' in exercises[0]).toEqual(true)
	})
})

