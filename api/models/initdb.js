const config = require('../config');
const db = require('./db.js');

const user = require('./user.js');
const chat = require('./chat')

console.log(user)

module.exports = async function initDB() {
    await user.init()
    await chat.init()
    

    console.log('Database initialised');    
}