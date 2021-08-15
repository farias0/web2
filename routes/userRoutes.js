const app = require('express')()
const userService = require('../services/userService')
const errors = require('../errors/userErrors')

/* app.get("/user", async (_, response, next) => {
  try {
    response.send(await userService.getAllAsync())
    next()
  } catch (error) {
    response.status(500).send(error)
  }
}) */

app.post("/user", async (request, response, next) => {
  try {
    response.send(await userService.createAsync(request.body))
    next()
  } catch (error) {

    switch(error) {
      case errors.invalidUsername:
      case errors.invalidEmail:
      case errors.invalidPassword:
      case errors.usernameAlreadyExists:
      case errors.emailAlreadyExists:
        response.status(400)
        break
      default:
        response.status(500)
    }

    response.send(error.message)
  }
})

module.exports = app