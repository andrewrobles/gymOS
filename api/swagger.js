const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/record.js']

swaggerAutogen(outputFile, endpointsFiles)
