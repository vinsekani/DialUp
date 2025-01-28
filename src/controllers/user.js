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
      return res
        .status(400)
        .json({ message: "Invalid userfirstName or password" });
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

    const edit = req.body;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const profile = await User.findByIdAndUpdate(id, edit, {
      new: true,
    });
    console.log(req.params);
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = { signUp, login, update };
