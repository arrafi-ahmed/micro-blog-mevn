const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: '123456',
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    },
    upvotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    },
    downvotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
