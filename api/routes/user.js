const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/isUserExist', userController.is_user_exist)
router.post('/createUser', userController.create_user)
router.post('/checkCredentials', userController.check_credentials)
router.post('/getPostsByUserId', userController.get_posts_by_user_id)
router.post('/getOwnProfile', userController.get_own_profile)

module.exports = router
