const log = console.log
const { nanoid } = require('nanoid')
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const config = require('../config')
const path = require('path')
const fs = require('fs')
const { Material } = require('./info')

const Chat = sequelize.define('chat', {
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
    messages: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    usersId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
})

class Chats {
    static async init() {
        if(config.db.cleanOnStartup) {
            await Chat.drop().then(res => {
                log('TABLE "CHATS" DROPPED')
            }).catch(err => log(`ОШИБКА ПРИ ДРОПЕ ТАБЛИЦЫ ЧАТОВ: ${err}`))
        }

        await Chat.sync({ force: true }).then(res => {
            log('TABLE "CHATS" CREATED')
        }).catch(err => log(`ОШИБКА ПРИ СОЗДАНИИ ТАБЛИЦЫ ЧАТОВ: ${err}`))

        if(config.db.loadMockupData) {
             const filePath = path.join(__dirname, 'mockups/chats.json')
             const mockups = JSON.parse(fs.readFileSync(filePath))
             mockups.map(async (item) => {
                 await Chat.create(item).then(res => {
                     log('МОКАП ЧАТА ЗАГРУЖЕН')
                 }).catch(err => log(`ОШИБКА ПРИ ЗАГРУЗКЕ МОКАПА ЧАТА: ${err}`))
                 const materialsChat = {
                     chatId: item.chatId,
                     messagesLength: item.messages.length
                 }
                 await Material.create(materialsChat).then(res => {
                     log('МОКАП МАТЕРИАЛОВ СОЗДАН')
                 }).catch(err => log(`ОШИБКА ПРИ ЗАГРУЗКЕ МОКАПА МАТЕРИАЛОВ: ${err}`))
            })

        }
    }
}

module.exports = {
    Chat, Chats
}
