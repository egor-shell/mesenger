const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/shell_messenger')

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

module.exports = sequelize