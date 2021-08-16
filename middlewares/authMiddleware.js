const authSevice = require('../services/authService')
const errors = require('../errors/authErrors')

module.exports = (request, response, next) => {

    try {
        const token = request.headers["authorization"]
        if (!token) throw errors.missingToken

        // gambiarra: for some reason when the request comes as form data instead of
        // post body, request.body is nullified when it reaches the controller function.
        // the files lib (multer) demands we use form data
        if(Object.keys(request.body).length>0) request.body.userId = authSevice.authenticate(token)
        else request.userId = authSevice.authenticate(token)

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