const Router = require('express'),
    controllers = require('../controllers'),
    router = new Router(),
    authMiddleware = require('../middleware/authMiddleware')

// router.get('/users', controllers.auth.getUsers)
// router.get('/user/:id', controllers.auth.getUserById)
router.post('/registration', controllers.auth.registration)
router.post('/login', controllers.auth.login)
// router.get('/auth', controllers.auth.check)
router.get('/auth', authMiddleware, controllers.auth.check)
router.post('/chats', controllers.chat.getChats)
router.post('/chat', controllers.chat.getChat)
// router.post('/update/:id', controllers.auth.updateUser)

module.exports = router