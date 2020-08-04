const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')

const blogRouter = require('./controller/blogController')

const app = express()

app.use(cors())

app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blog', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app