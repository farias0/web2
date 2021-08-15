const app = require('express')()
const userService = require('../services/userService')
const errors = require('../errors/userErrors')

app.post("/user", createUser)

module.exports = app


async function createUser(request, response, _) {

  try {
    response.send(await userService.createAsync(request.body))
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
}