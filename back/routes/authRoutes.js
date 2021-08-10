const app = require("express")()
const authService = require('../services/authService')
const errors = require('../errors')

app.post("/login", async (request, response) => {
  try {
    response.send(await authService.loginAsync(request.body))
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

    response.send(error)
  }
})

module.exports = app