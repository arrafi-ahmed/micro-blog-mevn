const Comment = require('../models/comment')
const Post = require('../models/post')

exports.create_comment = (req, res) => {
  const comment = new Comment({ ...req.body })
  comment
    .save()
    .then((comment) => {
      return Post.updateOne(
        { _id: comment.post_id },
        { $push: { comments: comment._id } }
      )
    })
    .then((response) => {
      if (response.nModified == 0) throw new Error('Comment failed')
      else res.status(200).json({ message: 'Comment successful', comment })
    })
    .catch((err) => {
      if (err.message == 'Comment failed')
        res.status(400).json({ message: err.message })
      else res.status(500).json({ message: 'Server error' })
    })
}
