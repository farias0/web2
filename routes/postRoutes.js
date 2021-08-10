const app = require('express')()
const postService = require('../services/postService')
const errors = require('../errors/postErrors')

app.get('/post', async (request, response) => {
  try {
    if (request.query && request.query.q) {
      response.send(await postService.searchAsync(request.query.q))
    } else {
      response.send(await postService.getAllAsync())
    }
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post('/post', async (request, response) => {
  console.log(request.body)

  try {
    response.send(await postService.createAsync(request.body))
  } catch (error) {

    console.log(error)

    switch(error) {
      case errors.invalidType:
        response.status(400)
        break
      case errors.invalidToken:
        response.status(401)
        break
      default:
        response.status(500)
    }

    response.send(error.message)
  }
})

module.exports = app