const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
const personRouter = require('./controllers/person')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

morgan.token('type', function (req, res) { return JSON.stringify(req.body)})
mongoose.set('useFindAndModify', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
// app.use(middleware.requestLogger)

app.use('/', personRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

