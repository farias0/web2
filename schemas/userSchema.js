const mongoose = require('mongoose')
const errors = require('../errors/userErrors')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
})

const User = mongoose.model("User", UserSchema)

module.exports = User