const swaggerAutogen = require('swagger-autogen')()

doc = {host: 'localhost:5000'}
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/record.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
