const Router = require('express'),
    controllers = require('../controllers'),
    router = new Router()

router.get('/users', controllers.auth.getUsers)
router.get('/user/:id', controllers.auth.getUserById)
router.post('/registration', controllers.auth.registration)
router.post('/login', controllers.auth.getLogin)
router.post('/update/:id', controllers.auth.updateUser)

module.exports = router