const { nanoid } = require('nanoid'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('db/users.json'),
    db = low(adapter),
    { Users } = require('../models/user')

db.defaults({
    users: [
        {
            username: 'root',
            userId: '1',
            password: 'root',
            email: 'shell.egor.jesus@gmail.com'
        }
    ]
}).write()

const getUser = (req, res, next) => {
    return Users.getUsers()
}

const registerUser = (user, req, res) => {
    return Users.createUser(user)
}

module.exports = {
    getUser, registerUser
}