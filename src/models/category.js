const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    firstName: { type: String, require },
    description: { type: String, require },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
