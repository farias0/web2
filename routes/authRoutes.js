const app = require("express")()
const authService = require('../services/authService')
const errors = require('../errors/authErrors')

app.post("/login", async (request, response, next) => {
  try {
    const token = await authService.loginAsync(request.body)
    response.set("x-access-token", token)
    response.end()
    next()
  } catch (error) {
    
    switch (error) {
      case errors.userNotFound:
        response.status(404)
        break
      case errors.invalidPassword:
        response.status(401)
        break
      default:
        response.status(500)
    }

    response.send(error.message)
  }
})

module.exports = app