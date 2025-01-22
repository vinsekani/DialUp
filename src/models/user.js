const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type: String, require},
    email:{type: String, require},
    phone:{type:String, require},
    password:{type:String, require},
    userType:{type:String, enum:["free", "pro"], default:"free", require}

},{timestamps:true})

module.exports = mongoose.model("User", userSchema)