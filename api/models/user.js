const db = require('./db')
const config = require('../config')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
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
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
                const hashPassword = await bcrypt.hash(item.password, 5)
                item.password = hashPassword
                await User.create(item).then(res => {
                    log('МОКАП ЗАГРУЖЕН')
                }).catch(err => log('ОШИБКА ПРИ ЗАГРУЖКЕ МОКАПА'))
            })
        }

        log('ТАБЛИЦА ПРОИНИЦИАЛИЗИРОВАНА')
    }
}

module.exports = {
    User, Users
}