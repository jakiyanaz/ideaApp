const express = require("express");
const serverconfig = require('./configs/server.config')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config');
const userModel = require("./models/user.model");
const bcrypt = require('bcrypt')

const app = express()


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection ;

db.on("error", ()=>{
    console.log("Error while connecting to db")
});

db.once("open", ()=>{
    console.log("DB is connected")

    init();
});

async function init(){

    let admin = await userModel.findOne({
        userId : "admin"
    })
    
    if(admin){
        console.log("Admin user exists")
        return;
    }

    admin = await userModel.create({
        name : "Jakiya Naz",
        userId : "admin",
        email : "nazjakiya1234@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("welcome1", 8)
    });
    console.log(admin);
}


app.listen(serverconfig.PORT, ()=>{
    console.log("Server Started")
})