const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({
        error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
        error: error.message 
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
        error: 'invalid token'
        })
    }

    logger.error(error.message)

    next(error)
}

const tokenExtractor = (request, response, next) => {
    if (request){
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.body.token = authorization.substring(7)
    }
    else{
        request.body.token = null
    }
    // console.log(request.body.token)
    }
  
    next()
}


module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor
}
