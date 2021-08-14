const Errors = {}

Errors.userNotFound = new Error('User not found')

Errors.invalidPassword = new Error('Invalid password')

Errors.authFailed = new Error('Authentication failed')

module.exports = Errors