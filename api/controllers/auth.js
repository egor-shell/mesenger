const { User } = require('../models/user')
const log = console.log
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const ApiError = require('../error/ApiError')
const colors = require('colors')

const generateJwt = (id, username, name, surname) => {
    return jwt.sign(
        {id, username, name, surname},
        config.jwt.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class auth {
    async registration(req, res, next) {
        const {username, password, email, name, surname} = req.body
        if(!username || !password || !email || !name || !surname) {
            return new Error(404, 'Некорректные данные')
        }
        let candidate = await User.findOne({ where: {username} })
        log(candidate)

        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        candidate = await User.findOne({ where: {email}})
        log(candidate)

        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashPassword, email, name, surname})

        const token = generateJwt(user.id, user.username, user.name, user.surname)
        res.json({token})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username: username}})
        if(!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.username, user.name, user.surname)
        return res.json({token})
    }
    async check(req, res, next) {
        const { username } = req.user
        const user = await User.findOne({ where: { username: username }})
        if(!user) {
            return next(ApiError.internal('Неправильный токен'))
        } else {
            const token = generateJwt(user.id, user.username, user.name, user.surname)
            console.log(colors.red(token))
            return res.json({token})
        }
    }
}

module.exports = new auth()