const { collection } = require('__mocks__/db')
const base = require('baseRepository.js')

const exerciseCollection = collection('exercises')
const exerciseRepository = base.repository(exerciseCollection)

module.exports = exerciseRepository
