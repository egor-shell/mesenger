const { Users } = require('../models/user')
const log = console.log
const bcrypt = require('bcrypt')
class auth {
    async registration(req, res) {
        try {
            await Users.createUser(req.body)
            const users = await Users.getUsers()
            res.send(users)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async getLogin(req, res) {
        try {
            await Users.getUserByUsername(req.body.username).then((user) => {
                if (user) {
                    if(user.password !== req.body.password) {
                        res.send('Неправильный пароль')
                    } else {
                        res.send('ПОЛЬЗОВАТЕЛЬ ПРОШЁЛ ПРОВЕРКУ')
                    }
                } else {
                    res.send('ПОЛЬЗОВАТЕЛЯ С ТАКИМ ИМЕНЕМ НЕ СУЩЕСТВУЕТ')
                }
            })
            // res.send(users)
        } catch (e) {
            res.status(400).json('Упс... Что-то случилось')
        }
    }
    async getUsers(req, res) {
        try {
            const users = await Users.getUsers()
            console.log(users)
            res.send(users)
        } catch (e) {
            res.status(400).json('Упс... Что-то случилось')
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id
            const user = await Users.getUserById(id)
            // console.log(users)
            res.json(user)
        } catch (e) {
            res.status(400).json('Упс... Что-то случилось')
        }
    }
    async updateUser(req, res) {
        try {
            await Users.updateUser(req.params.id, req.body)
            res.json('Данные обновлены')
        } catch (e) {
            res.status(400).json('Упс... Что-то случилось')
        }
    }

}

module.exports = new auth()