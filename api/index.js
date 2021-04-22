require('dotenv').config()
const express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    sequelize = require('./db')

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log("Backend server live on " + port))
    } catch (e) {
        console.log(e)
    }
}

start()