const db = require('./db')
const config = require('../config')
const fs = require('fs')
const path = require('path')
const log = console.log
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
})

class Users {
    static async init() {
        if (config.db.cleanOnStartup) {
            await User.drop().then(res => {
                log('TABLE DROPPED')
            }).catch(err => log('ОШИБКА ПРИ ДРОПЕ ТАБЛИЦЫ'))
        }

        await User.sync({ force: true }).then(res => {
            log('ТАБЛИЦА СОЗДАНА')
        }).catch(err => log('ОШИБКА ПРИ СОЗДАНИИ ТАБЛИЦЫ'))

        if(config.db.loadMockupData) {
            const filePath = path.join(__dirname, 'mockups/users.json');
            const mockups = JSON.parse(fs.readFileSync(filePath))
            mockups.forEach(async (item) => {
                await User.create(item).then(res => {
                    log('МОКАП ЗАГРУЖЕН')
                }).catch(err => log('ОШИБКА ПРИ ЗАГРУЖКЕ МОКАПА'))
            })
        }

        log('ТАБЛИЦА ПРОИНИЦИАЛИЗИРОВАНА')
    }
    static async getUsers() {
        return await User.findAll({raw:true}).then(users => {
            return users
        }).catch(err=>console.log('ТАБЛИЦЫ НЕ НАЙДЕНО'));
    }

    static async getUserById(id) {
        return await User.findOne({where: {id: id}}).then(user => {
            if(!user) return
            return user
        }).catch(err => log(err))
    }

    static async createUser(user) {
        await User.create(user).then(res => {
            log('ПОЛЬЗОВАТЕЛЬ СОЗДАН')
        }).catch(err => log('ОШИБКА ПРИ СОЗДАНИИ ПОЛЬЗОВАТЕЛЯ'))
    }

    static async getUserByUsername(username) {
        return await User.findOne({where: {username: username}}).then(user => {
            if(!user) return
            return user.dataValues
        }).catch(err => log(err))
    }

    static async updateUser(id, data) {
        await User.findOne({where: {id: id}}).then(user => {
            if(!user) return
            log(data)
            return User.update({username: data.username, password: data.password, name: data.name, surname: data.surname}, {
                where: {
                    id: user.dataValues.id
                }
            })
        })
    }
}

module.exports = {
    User, Users
}