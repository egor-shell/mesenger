const log = console.log
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const config = require('../config')


const Material = sequelize.define('material', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    chatId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    messagesLength: {
        type: DataTypes.INTEGER
    }
})

class Materials {
    static async init() {
        if(config.db.cleanOnStartup) {
            await Material.drop().then(res => {
                log('TABLE "MATERIALS" DROPPED')
            }).catch(err => log(`ОШИБКА ПРИ ДРОПЕ ТАБЛИЦЫ МАТЕРИАЛОВ: ${err}`))
        }

        await Material.sync({ force: true }).then(res => {
            log('TABLE "MATERIALS" CREATED')
        }).catch(err => log(`ОШИБКА ПРИ СОЗДАНИИ ТАБЛИЦЫ МАТЕРИАЛОВ: ${err}`))
    }
}

module.exports = {
    Material, Materials
}
