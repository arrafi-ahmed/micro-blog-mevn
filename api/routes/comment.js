const router = require('express').Router()
const commentController = require('../controllers/comment')

router.post('/createComment', commentController.create_comment)

module.exports = router
