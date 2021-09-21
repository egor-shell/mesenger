const sequelize = require('../models/db')
const colors = require('colors')

const { Chat } = require('../models/chat'),
    { User } = require('../models/user'),
    { Material } = require('../models/info'),
    { nanoid } = require('nanoid'),
    { Op } = require('sequelize')

let currentChat = {}

module.exports = (io, socket) => {

    const getChats = async (userId) => {
        const chats = await Chat.findAll({
            raw: true
        })
        const userChats = []
        chats.map((chat) => {
            let myChats = chat.usersId.findIndex(i => i === userId)
            if(myChats !== -1) {
                return userChats.push(chat)
            }
            return
        })
        
        io.to(socket.roomId).emit('chats', userChats)
    }

    const addMessage = async ({ usersId, chatId, userId, messageText, senderName }) => {
        let id = nanoid(8)
        let newMessage
        let checkedChats = await Chat.findOne({
            where: { chatId: chatId },
            raw: true
        })
        if(checkedChats === null) {
            checkedChats = await Chat.create({
                usersId: usersId,
                chatId: chatId,
                messages: []
            })

            await Material.create({
                chatId: chatId,
                messagesLength: 0
            })

            const newChat = {
                usersId: usersId,
                chatId: chatId,
                messagesLength: 1
            }

            usersId.map(async (id) => {
                await User.update(
                { chats: sequelize.fn(
                    'array_append',
                    sequelize.col('chats'),
                    JSON.stringify(newChat)
                )},
                {where: {
                    id: id }
                }
                )
            })


            const users = await User.findAll({
                raw: true
            })
            users.map((user) => {
                console.log(user.chats)
            })
        }

        const checkMessageId = async () => {
            // const chat = await Chat.findOne({
            //     where: { chatId: currentChat.chatId }
            // })
            const checked = checkedChats.messages.find(checkedMessage => checkedMessage.messageId === id)
            while(checked) {
                id = nanoid(8)
            }
            newMessage = Object.assign({ messageId: id}, {userId, messageText, senderName})
        }
        await checkMessageId()
        
        await Chat.update(
            { messages: sequelize.fn(
                'array_append',
                sequelize.col('messages'),
                JSON.stringify(newMessage)
            )},
            {where: {
                chatId: chatId }
            }
        )

        await Material.increment('messagesLength', {
            where: {
                chatId: chatId
            }
        })
        currentChat = await Chat.findOne({
            where: { usersId: usersId },
            raw: true
        })
        console.log(colors.bgBlue(currentChat))

        getChat(currentChat)
    }

    const removeMessage = (messageId) => {
        db.get('messages').remove({ messageId }).write()

        getMessages()
    }

    async function checkChat(data) {

        let chat = {}

        
        chat = await Chat.findOne({
            where: { chatId: data },
            raw: true
        })

        if(chat) {
            getChat(chat)
        } else {
            return
        }
    }
    async function getChat(data) {
        console.log(colors.bgGreen(data))
        if(data.usersId) {
            const checkChat = await data.usersId.sort((a, b) => {
                return a - b
            })
        let chat = await Chat.findOne({
            where: { usersId: checkChat},
            raw: true
        })

        if (chat) {
            currentChat = chat
        } else {
            let url = []
            const users = await User.findAll({
                attributes: [ 'id', 'username' ],
                raw: true
            })

            console.log(colors.red(data.usersId))
            const checkedChat = await Chat.findOne({
                where: { chatId: data.chatId },
                raw: true
            })
            while(checkedChat) {
                data.chatId = nanoid(8)
            }
            currentChat = data

            const chat = {}
            const newChat = Object.assign({ 
                chatId: currentChat.chatId, 
                usersId: currentChat.usersId, 
                messages: []
            }, chat)
        }
        io.in(socket.roomId).emit('chattt', currentChat)
        }
    }

    socket.on('chats:get', getChats)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
    socket.on('chat:get', getChat)
    // socket.on('chat:add', addChat)
    // socket.on('hello:world', helloWorld)
    socket.on('chat:check', checkChat)
}