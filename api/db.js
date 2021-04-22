require('dotenv').config()
const {Sequelize} = require('sequelize')
const config = require('./config')

module.exports = new Sequelize(
    config.db.DB_NAME,
    config.db.DB_USER,
    config.db.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: config.db.DB_HOST,
        port: config.db.DB_PORT
    }
)