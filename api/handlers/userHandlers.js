const { User } = require('../models/user')
const colors = require('colors')
const sequelize = require('../models/db')

module.exports = (io, socket) => {
    async function getUsers() {
        const usersList = await User.findAll({ raw: true })
        io.in(socket.roomId).emit('users', usersList)
    }

    async function addUser({ username, userId }) {
        await User.update({ online: true, socketId: socket.id }, { where: { username }})
        const user = await User.findOne({ where: { username }, raw: true})
        getUsers()

    }

    async function removeUser(userId) {
        await User.update({ online: false, socketId: '' }, { where: { id: userId }})
        const user = await User.findOne({ where: { id: userId }, raw: true})
        getUsers()
    }

    async function addMessage({ usersId }) {
        const users = await User.findAll({
            raw: true
        })
        // console.log(colors.blue(users))
        // let user = users.find((u) => (
        //     console.log(colors.blue(u.chats.map((c) => {
        //         return c.usersId
        //     })))

        // ))
        users.map(u => console.log(u.chats))
        console.log(colors.red(usersId))
        let user = users.map((u) => u.chats.filter((c) => JSON.stringify(c.usersId) === JSON.stringify(usersId)))
        const indexEmpty = user.findIndex((c) => c.length === 0)
        console.log(colors.blue(user))
        user.splice(indexEmpty, 1)
        user.splice(1, 1)
        user[0][0].messagesLength = user[0][0].messagesLength + 1
        console.log(colors.red(user[0][0]))
        const userChange = await User.findAll({
            where: sequelize.literal,
            raw: true
        })
        console.log(userChange)

    }


    socket.on('users:get', getUsers)
    socket.on('user:addMessage', addMessage)
    socket.on('users:add', addUser)
    socket.on('users:leave', removeUser)
}