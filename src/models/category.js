const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{type: String, require},
    description:{type:String, require}
}, {timestamps:true})

module.exports = mongoose.model("Category", categorySchema)