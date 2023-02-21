const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
        // latitude:{
        //     type:String,
        //     required:true
        // },
        // longitude:{
        //     type:String,
        //     required:true
        // }
    },
    otp:{
        type:String,
        required:true
    },
    otp_expiry:{
        type:Date
    }
    
})

const User = new mongoose.model("User", userSchema)

module.exports = User