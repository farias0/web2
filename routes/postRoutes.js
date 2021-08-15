const app = require('express')()
const postService = require('../services/postService')
const authMiddleware = require('../middlewares/authMiddleware')
const cacheMiddleware = require('../middlewares/cacheMiddleware')
const errors = require('../errors/postErrors')

app.get('/post', authMiddleware, cacheMiddleware.cache, async (request, response, next) => {
  try {
    if (request.query && request.query.q) {
      response.send(await postService.searchAsync(request.query.q))
    } else {
      response.send(await postService.getAllAsync())
    }
    next()
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post('/post', authMiddleware, async (request, response, next) => {
  console.log(request.body)

  try {
    response.send(await postService.createAsync(request.body))
    next()
  } catch (error) {

    console.log(error)

    switch(error) {
      case errors.invalidType:
        response.status(400)
        break
      default:
        response.status(500)
    }

    response.send(error.message)
  }
}, cacheMiddleware.clear)

module.exports = app