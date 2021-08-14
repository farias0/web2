const Errors = {}

Errors.userNotFound = new Error('User not found')

Errors.invalidPassword = new Error('Invalid password')

Errors.missingToken = new Error('Authentication credentials missing')

Errors.invalidToken = new Error('Authentication failed')

module.exports = Errors