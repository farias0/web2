const app = require('express')()
const postService = require('../services/postService')
const authMiddleware = require('../middlewares/authMiddleware')
const cacheMiddleware = require('../middlewares/cacheMiddleware')
const errors = require('../errors/postErrors')

app.get('/post', authMiddleware, cacheMiddleware.cache, getPosts)

app.post('/post', authMiddleware, createPost, cacheMiddleware.clear)

module.exports = app

//

async function getPosts(request, response, next) {

  try {
    if (request.query && request.query.q) {
      response.send(await postService.searchAsync(request.query.q))
    } else {
      response.send(await postService.getAllAsync())
    }
    return next()
  } catch (error) {
    response.status(500).send(error)
    return
  }
}

async function createPost(request, response, next) {

  try {
    response.send(await postService.createAsync(request.body))
    return next()
  } catch (error) {

    switch(error) {
      case errors.invalidType:
        response.status(400)
        break
      default:
        response.status(500)
    }

    response.send(error.message)
    return
  }
}