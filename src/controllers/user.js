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
  const { id } = req.params;
  const { name, email, phone, photo, password } = req.body;

  try {
    // Fetch user by ID
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if they are provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (photo) user.photo = photo;

    // Hash and update the password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user document
    const updatedUser = await user.save();

    // Send updated user details in the response
    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        photo: updatedUser.photo,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = update;



module.exports = { signUp, login, update };
