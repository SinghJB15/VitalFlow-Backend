const bcrypt = require("bcrypt");
const express = require("express");
const Users = require("../models/Users");

//Create user
const createUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Create the user with hashed password
    const newUser = await Users.create({
      name,
      email,
      username,
      password: hashedPassword, // Save the hashed password
    });

    // Respond with success if user is created
    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

module.exports = createUser;
