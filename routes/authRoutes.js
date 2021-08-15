const app = require("express")()
const authService = require('../services/authService')
const errors = require('../errors/authErrors')

app.post("/login", login)

module.exports = app


async function login(request, response, _) {

  try {
    const token = await authService.loginAsync(request.body)
    response.set("Access-Control-Expose-Headers", "x-access-token")
    response.set("x-access-token", token)
    response.end()
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
}