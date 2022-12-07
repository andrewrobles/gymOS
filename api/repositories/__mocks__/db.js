const MongoClient = require('mongodb').MongoClient
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer
let database
let connection

const connect =async () => {
	mongoServer = await MongoMemoryServer.create({instance: {dbName: 'gym'}})
	const mongoUri = mongoServer.getUri()
	connection = await MongoClient.connect(mongoUri)
	database = await connection.db('gym')
}

const disconnect = async () => {
	await database.dropDatabase()
	await connection.close()
  	await mongoServer.stop()
}

const collection = (collection) => database.collection(collection)

module.exports = {
	connect,
	collection,
	disconnect
}
