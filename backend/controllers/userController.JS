const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.loginUser = async (req, res) => {
  // Implement login logic here
  res.status(200).json({ message: "Login successful" });
};
