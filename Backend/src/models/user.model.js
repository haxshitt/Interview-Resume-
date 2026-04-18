const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : [true, "username already taken"]
    },

    email: {
        type : String,
        required : true,
        unique : [true, "user with this username already exists"]
    },

    password: {
        type : String,
        required : true,
        unique : true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;