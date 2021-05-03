const Post = require('../models/post')
const User = require('../models/user')

exports.get_posts = (req, res) => {
  Post.find({})
    .sort('-createdAt')
    .populate('user', 'username')
    .then((posts) => {
      res.status(200).json({ posts: posts })
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }))
}
exports.create_post = (req, res) => {
  const post = new Post(req.body)
  post
    .save()
    .then((post) => {
      if (!post) throw new Error('Post failed')
      else
        return User.updateOne(
          { _id: req.body.user },
          { $push: { posts: post._id } }
        )
    })
    .then((response) => {
      if (response.nModified == 0) throw new Error('Post failed')
      else res.status(200).json({ message: 'Posted successfuly', post })
    })
    .catch((err) => {
      if (err.message == 'Post failed')
        res.status(400).json({ message: err.message })
      else res.status(500).json({ message: 'Server error' })
    })
}
exports.get_comments = (req, res) => {
  Post.findById(req.body.postId)
    .select('comments')
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user_id',
        model: 'User',
        select: 'username',
      },
    })
    .then((post) => {
      if (post.comments.length > 0) res.status(200).send(post)
      else res.status(204).json({ message: null })
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server error' })
    })
}
exports.create_upvote = (req, res) => {
  let changeDownvote = false
  const upvote = User.findById(req.body.userId)
    .exec()
    .then((user) => {
      if (!user) throw new Error('Downvote failed')

      // check if post not in upvotes and insert
      if (user.upvotes.indexOf(req.body.postId) !== -1)
        throw new Error('Already upvoted')
      return User.updateOne(
        { _id: req.body.userId },
        { $push: { upvotes: req.body.postId } }
      ).exec()
    })
    .then((user) => {
      // increase upvote count
      if (user.nModified == 0) throw new Error('Upvote failed')
      return Post.updateOne(
        { _id: req.body.postId },
        { $inc: { upvote_count: 1 } }
      ).exec()
    })

  const downvote = User.findById(req.body.userId)
    .exec()
    .then((user) => {
      if (!user) throw new Error('Upvote failed')

      // check if post in downvotes and remove
      if (user.downvotes.indexOf(req.body.postId) === -1)
        return Promise.resolve()
      return User.updateOne(
        { _id: req.body.userId },
        { $pull: { downvotes: req.body.postId } }
      )
        .exec()
        .then((user) => {
          // decrease downvote count

          return Post.updateOne(
            { _id: req.body.postId },
            { $inc: { downvote_count: -1 } }
          ).exec()
        })
        .then((post) => {
          if (post.nModified > 0) {
            changeDownvote = true
          }
        })
    })

  Promise.all([upvote, downvote])
    .then((result) => {
      res.status(200).json({
        message: 'Upvote successfull',
        changeDownvote,
      })
    })
    .catch((err) => {
      if (err.message == 'Upvote failed' || err.message == 'Already upvoted') {
        res.status(400).json({ message: err.message })
      } else {
        res.status(500).json({ message: 'Server Error' })
      }
    })
}
exports.create_downvote = (req, res) => {
  let changeUpvote = false
  const downvote = User.findById(req.body.userId)
    .exec()
    .then((user) => {
      if (!user) throw new Error('Downvote failed')

      // check if post not in downvotes and insert
      if (user.downvotes.indexOf(req.body.postId) !== -1)
        throw new Error('Already downvoted')
      return User.updateOne(
        { _id: req.body.userId },
        { $push: { downvotes: req.body.postId } }
      ).exec()
    })
    .then((user) => {
      // increase downvote count
      if (user.nModified == 0) throw new Error('Downvote failed')
      return Post.updateOne(
        { _id: req.body.postId },
        { $inc: { downvote_count: 1 } }
      ).exec()
    })

  const upvote = User.findById(req.body.userId)
    .exec()
    .then((user) => {
      if (!user) throw new Error('Downvote failed')

      // check if post in upvotes and remove
      if (user.upvotes.indexOf(req.body.postId) === -1) return Promise.resolve()
      return User.updateOne(
        { _id: req.body.userId },
        { $pull: { upvotes: req.body.postId } }
      )
        .exec()
        .then((user) => {
          // decrease upvote count

          return Post.updateOne(
            { _id: req.body.postId },
            { $inc: { upvote_count: -1 } }
          ).exec()
        })
        .then((post) => {
          if (post.nModified > 0) {
            changeUpvote = true
          }
        })
    })

  Promise.all([downvote, upvote])
    .then((result) => {
      res.status(200).json({
        message: 'Downvote successfull',
        changeUpvote,
      })
    })
    .catch((err) => {
      if (
        err.message == 'Downvote failed' ||
        err.message == 'Already downvoted'
      ) {
        res.status(400).json({ message: err.message })
      } else {
        res.status(500).json({ message: 'Server Error' })
      }
    })
}
