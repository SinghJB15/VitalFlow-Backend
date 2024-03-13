const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const express = require("express");

//Find user by username
const findUserByUsername = async(username) => {
    try {
        return await Users.findOne({username});
    } catch(error) {
        throw new Error("Error finding user");
    }
}

//Create a session for registered users
const session = async(req, res) => {
    try {
        const foundUser = await findUserByUsername(req.body.username);
        //Username not found
        if(!foundUser) {
            return res.status(400).json({ message: "Cannot find username"});
        }
        //Check inputted user password matches password in database
        if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.regenerate((err) => {
                if(err) {
                    return res.status(500).json({ message: "Error regenerating session" });
                }
                req.session.currentUser = {
                    id: foundUser._id,
                    username: foundUser.username
                }
                return res.status(200).json({
                    message: "login Successful",
                    user: { id: foundUser._id, username: foundUser.username }
                });
            }); 
        } else {
            return res.status(400).json( {message: "Passwords do not match"});
        }
    } catch(error) {
        console.error("Session creation error: ", error);
        res.status(500).json({ message: "Error in session creation" })
    }
}

//Delete session after user logs out
const deleteSession = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(400).json({ message: "Error destroying the session" });
        }
        //clear the session cookie from the users browser
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Session ended successfully"} )
    });
}

module.exports = {
    findUserByUsername,
    session,
    deleteSession
};