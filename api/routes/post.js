const router = require('express').Router()
const postController = require('../controllers/post')

router.get('/getPosts', postController.get_posts)
router.post('/createPost', postController.create_post)
router.post('/getComments', postController.get_comments)
router.post('/createUpvote', postController.create_upvote)
router.post('/createDownvote', postController.create_downvote)

module.exports = router
