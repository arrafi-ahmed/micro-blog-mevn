const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
    upvote_count: {
      type: Number,
      default: 0,
    },
    downvote_count: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
