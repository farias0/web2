const jwt = require('jsonwebtoken')
const userService = require('./userService')
const errors = require('../errors')

const privateKey = 'good_software_development_practices'

const Service = {}

Service.loginAsync = async (loginData) => {
    const user = await userService.getByUsernameAsync(loginData.username)

    if (user) {
        if (user.password === loginData.password) {
            const token = jwt.sign({ sub: user._id }, privateKey)

            return {
                username: user.username,
                token
            }
        } else {
            throw errors.invalidPassword
        } 
    } else {
        throw errors.userNotFound
    }
}

module.exports = Service