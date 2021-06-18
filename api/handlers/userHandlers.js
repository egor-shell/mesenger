const { User } = require('../models/user')
const users = {}


module.exports = (io, socket) => {
    async function getUsers() {
        const usersList = await User.findAll({ raw: true })
        io.in(socket.roomId).emit('user', usersList)
    }

    async function addUser({ username, userId }) {
        await User.update({ online: true, socketId: socket.id }, { where: { username }})
        const user = await User.findOne({ where: { username }, raw: true})
        console.log(user)
        getUsers()

    }

    async function removeUser(userId) {
        console.log(userId)
        await User.update({ online: false, socketId: '' }, { where: { id: userId }})
        const user = await User.findOne({ where: { id: userId }, raw: true})
        console.log(user)
        getUsers()
    }

    async function privateMessage(data) {
        console.log(data)
    }

    socket.on('user:get', getUsers)
    socket.on('user:add', addUser)
    socket.on('user:leave', removeUser)
    socket.on('privateMessage', privateMessage)
}