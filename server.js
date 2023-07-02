const express = require("express");
const serverconfig = require('./configs/server.config')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')

const app = express()


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection ;

db.on("error", ()=>{
    console.log("Error while connecting to db")
});

db.once("open", ()=>{
    console.log("DB is connected")
});


app.listen(serverconfig.PORT, ()=>{
    console.log("Server Started")
})