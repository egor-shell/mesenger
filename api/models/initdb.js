const config = require('../config');
const db = require('./db.js');

const user = require('./user.js');

module.exports = async function initDB() {
    await user.init();

    console.log('Database initialised');    
}