const db = require('../repositories/__mocks__/db.js')

let exerciseRepository

beforeAll(async () => {
	await db.connect()
	exerciseRepository = require('exerciseRepository')
})

afterAll(async () => {
	await db.disconnect()
})

afterEach(async () => {
	exerciseRepository.deleteAll()
})

describe('exercise repository', () => {
	it('gets exercises', async () => {
		await exerciseRepository.insertOne({})
		const [error, exercises] = await exerciseRepository.getMany()
		
		expect(exercises.length).toEqual(1)
	})
})
