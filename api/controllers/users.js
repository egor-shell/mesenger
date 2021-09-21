const { User } = require('../models/user')
const colors = require('colors')
const log = console.log
const config = require('../config')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { Chat } = require('../models/chat')

const generateJwt = (id, username, name, surname) => {
    return jwt.sign(
        {id, username, name, surname},
        config.jwt.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class user {
    async getAllUsers() {
        const users = await User.findAll({
            raw: true
        })
        return users
    }

    async getUser({ id }) {
        const user = await User.findOne({
            where: { id: id },
            raw: true
        })
        return user
    }

    async getChat({ usersId }) {
        const chat = await Chat.findOne({
            where: { usersId: usersId},
            raw: true
        })

        return chat
    }

    async registration({input}) {
        const {username, password, email, name, surname} = input

        if(!username || !password || !email || !name || !surname) {
            return new Error(404, 'Некоректные данные')
        }

        let candidate = await User.findOne({
            where: { username }
        })

        if(candidate) {
            return ApiError.badRequest('Пользователь с таким именем существует')
        }

        candidate = await User.findOne({
            where: { email }
        })

        if(candidate) {
            return ApiError.badRequest('Пользователь с таким e-mail существует')
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const users = await User.findAll({
            raw: true
        })
        const id = users.length + 1
        const newUser = await User.create({
            id: id,
            username: username,
            password: hashPassword,
            email: email,
            name: name,
            surname: surname
        }).then(res => {
            return res.dataValues
        }).catch(err => console.log(err))

        const token = generateJwt(newUser.id, newUser.username, newUser.name, newUser.surname)

        newUser.token = token

        return newUser
    }

    async login({input}) {
        const {username, password} = input
        const user = await User.findOne({
            where: { username },
            raw: true
        })

        log(colors.blue(user))

        if(!user) {
            return ApiError.internal('Пользователь с таким логином не найден')
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword) {
            return ApiError.internal('Неверный пароль')
        }

        const token = generateJwt(user.id, user.username, user.name, user.surname)

        user.token = token

        return user
    }

    async addChat({input}) {
        const { chatId, usersId } = input

        console.log(colors.bgRed(chatId))
        console.log(colors.bgRed(usersId))

        usersId.map(async (userId) => {
            const user = await User.findOne({
                where: { id: userId },
                raw: true
            })

            console.log(user.chats)

            user.chats.push({usersId, chatId})

            console.log(user.chats)

        })
    }
}

module.exports = {
    user
}