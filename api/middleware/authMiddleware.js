const jwt = require('jsonwebtoken'),
    config = require('../config')

const colors = require('colors')

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const decoded = jwt.verify(token, config.jwt.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован'})
    }
}