const Sequelize = require('sequelize')
const config = require('../config')

// const configBD = {
//     config.pg.DB_NAME,
//     config.pg.DB_USER,
//     config.pg.DB_PASSWORD,
// }
//   {
//     dialect: 'postgres',
//     host: 'localhost'
//   }
// )
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/shell_messenger')

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

module.exports = sequelize

