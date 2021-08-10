const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  contentType: {
    type: String,
    required: true
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post