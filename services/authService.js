const jwt = require('jsonwebtoken')
const userService = require('./userService')
const errors = require('../errors/authErrors')

const privateKey = 'good_software_development_practices'

const Service = {}

Service.loginAsync = async ({ username, password }) => {
    const user = await userService.getByUsernameAsync(username)

    if (user) {
        if (user.password === password) {
            return jwt.sign({ sub: user._id }, privateKey)
        } else {
            throw errors.invalidPassword
        } 
    } else {
        throw errors.userNotFound
    }
}

Service.authenticate = (token) => {
    try {
        return jwt.verify(token, privateKey).sub; 
    } catch (error) {
        throw errors.invalidToken
    }
}

module.exports = Service