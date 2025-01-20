const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, require },
  phone: { type: String, require },
  email: { type: String, require },
  photo: { type: String, require },
  category: { type: String },
  company: { type: String },
});

module.exports = mongoose.model("Contact", contactSchema)
