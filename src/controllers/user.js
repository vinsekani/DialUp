const User = require("../models/user");
const { generateToken } = require("../helpers/generateToken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, phone, email, photo, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user alredy exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      photo,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    res.cookie(token, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 1000,
    });

    const savedUser = await newUser.save();
    const { password: userPassword, ...otherFields } = savedUser._doc;
    console.log(otherFields);
    return res.status(201).json({ ...otherFields, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = generateToken(user._id);
    res.cookie(token, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 1000,
    });

    const { password: userPassword, ...otherFields } = user._doc;
    return res.status(201).json({ ...otherFields, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};



const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if email is being updated and already exists
    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Hash the password if it's included in the updates
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Use findOneAndUpdate to directly update the document
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude the password before sending the response
    const { password, ...userData } = updatedUser._doc;
    return res.status(200).json({ message: "Profile updated", user: userData });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};





module.exports = { signUp, login, update };
