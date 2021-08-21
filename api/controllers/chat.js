const { Op } = require('sequelize')

const { Chat } = require('../models/chat'),
    { nanoid } = require('nanoid'),
    log = console.log,
    ApiError = require('../error/ApiError')

class chat {
    async getChats(req, res, next) {
        const {userId} = req.body
        const chats = await Chat.findAll({
            where: {
                usersId: {
                    [Op.contains]: [userId]
                }
            }
        })
        return res.json({chats})
    }
    async getChat(req, res, next) {
        const {usersId} = req.body
        const chat = await Chat.findOne({ where: { usersId: usersId } })
        return res.json({chat})
    }
}

module.exports = new chat()