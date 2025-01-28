const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, require },
  phone: { type: String, require },
  email: { type: String, require },
  photo: { type: String, require, default:"https://res.cloudinary.com/oroko/image/upload/v1737614653/user_pigxco.jpg" },
  category: { type: String },
  company: { type: String },
  uid:{type:String}
},{timestamps:true});

module.exports = mongoose.model("Contact", contactSchema)
