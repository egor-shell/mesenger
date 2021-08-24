const sequelize = require('../models/db')
const colors = require('colors')

const { Chat } = require('../models/chat'),
    { User } = require('../models/user'),
    { nanoid } = require('nanoid'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db/messages.json'),
    db = low(adapter),
    { Op } = require('sequelize')

let currentChat = {}

db.defaults({
    messages: [
        {
        messageId: '1',
        userId: '1',
        senderName: 'Bob',
        messageText: 'What are you doing here?',
        createdAt: '2021-01-14'
        },
        {
        messageId: '2',
        userId: '2',
        senderName: 'Alice',
        messageText: 'Go back to work!',
        createdAt: '2021-02-15'
        }
    ]
}).write()

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
            // io.to(socket.roomId).emit('chattt', chat)
        } else {
            return
        }

        // if(typeof data === 'string') {
        //     console.log(colors.blue('NO CHAT'))
        //     chat = await Chat.findOne({
        //         where: { chatId: data}
        //     })
        // }
        // } else {
        //     console.log(colors.blue('CHAT'))
        //     chat = await Chat.findOne({
        //         where: { usersId: currentChat.usersId},
        //         raw: true
        //     })
        // }
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

            // await Chat.create(newChat).then(res => {
            //     console.log(colors.red('НОВЫЙ ЧАТ СОЗДАН'))
            // }).catch(err => console.log(err))
    
            // currentChat = newChat
            // console.log(colors.red(currentChat.messages.length))
            // await User.update({ 
            //         chats: sequelize.fn(
            //         'array_append',
            //         sequelize.col('chats'),
            //         JSON.stringify({usersId: currentChat.usersId, chatId: currentChat.chatId })
            //         )
            //     },
            //     { where: {
            //     id: currentChat.usersId.map(i => { return i })
            //     }}
            // )
        }
        io.in(socket.roomId).emit('chattt', currentChat)
        }
    }
    // async function addChat(data) {

    //     const chat = {}
    //     const newChat = Object.assign({ 
    //         chatId: currentChat.chatId, 
    //         usersId: currentChat.usersId, 
    //         messages: []
    //     }, chat)

    //     await Chat.create(newChat).then(res => {
    //         console.log('НОВЫЙ ЧАТ СОЗДАН')
    //     }).catch(err => console.log(err))

    //     currentChat = newChat

    //     const newMessage = data

    //     // await User.update({ 
    //     //     chats: sequelize.fn(
    //     //     'array_append',
    //     //     sequelize.col('chats'),
    //     //     JSON.stringify({usersId: currentChat.usersId, chatId: currentChat.chatId})
    //     // )},
    //     // { where: {
    //     //     id: currentChat.usersId.map(i => { return i })
    //     // }}
    //     // )
    //     getChat(newChat)
    //     checkChat()
    //     addMessage(newMessage)

    // }

    socket.on('chats:get', getChats)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
    socket.on('chat:get', getChat)
    // socket.on('chat:add', addChat)
    // socket.on('hello:world', helloWorld)
    socket.on('chat:check', checkChat)
}