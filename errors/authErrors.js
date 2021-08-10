const Errors = {}

Errors.userNotFound = new Error('User not found')

Errors.invalidPassword = new Error('Invalid password')

module.exports = Errors