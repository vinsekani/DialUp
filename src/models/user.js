const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    phone: { type: String, require },
    photo: {
      type: String,
      require,
      default:
        "https://res.cloudinary.com/oroko/image/upload/v1737614653/user_pigxco.jpg",
    },
    password: { type: String, require },
    userType: { type: String, enum: ["free", "pro"], default: "free", require },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
