const authSevice = require('../services/authService')
const errors = require('../errors/authErrors')

module.exports = (request, response, next) => {

    try {
        const token = request.headers["authorization"]
        if (!token) throw errors.missingToken
        request.body.userId = authSevice.authenticate(token)
        next()

    } catch (error) {

        switch (error) {
            case errors.missingToken:
                response.status(401)
                break
            case errors.invalidToken:
                response.status(403)
                break
            default:
                response.status(500)
        }

        response.send(error.message)
    }
};