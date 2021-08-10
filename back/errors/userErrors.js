const Errors = {}

Errors.userNotFound = new Error('User not found')

Errors.invalidUsername = new Error('Invalid username')

Errors.invalidPassword = new Error('Invalid password')

Errors.invalidEmail = new Error('Invalid email')

Errors.usernameAlreadyExists = new Error('Username already exists')

Errors.emailAlreadyExists = new Error('Email already exists')

module.exports = Errors