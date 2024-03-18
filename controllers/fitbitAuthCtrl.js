require("dotenv").config();
const express = require("express");
const axios = require("axios");
const Users = require("../models/Users");

//Environment variables 
const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;
const REDIRECT_URL = encodeURIComponent(process.env.FITBIT_CALLBACK_URL);
const AUTHORIZATION_URL = process.env.FITBIT_AUTHORIZATION_URL;
const TOKEN_URL = process.env.FITBIT_TOKEN_URL;
const SCOPES = encodeURIComponent("activity location respiratory_rate temperature cardio_fitness nutrition weight electrocardiogram oxygen_saturation sleep heartrate profile settings");

//Function to generate the Fitbit authentication URL
const generateAuthenticationUrl = () => {
    const baseUrl = AUTHORIZATION_URL;
    return `${baseUrl}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&prompt=login consent`;
}

//Handle redirect URL after user authorizes our app to access their data
const handleFitbitRedirect = async(req, res) => {
    const authorizationCode = req.query.code;
    if(!authorizationCode) {
        return res.status(400).json({ message: "Authorization code is missing"} );
    }

    //Data needed to send request to Fitbit to get tokens
   const tokenRequestBody = `grant_type=authorization_code&redirect_uri=${REDIRECT_URL}&code=${authorizationCode}`;
   const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
   const credentialsBase64Encoded = Buffer.from(credentials).toString('base64');

   //POST request to Fitbit API to echange authorization code for tokens
   try {
    const response = await axios.post(TOKEN_URL, tokenRequestBody, {
        headers: {
            'Authorization': `Basic ${credentialsBase64Encoded}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    //Store access tokens to variable
    const { access_token, refresh_token, expires_in } = response.data;
    console.log('Session:', req.session);
    const userId = req.session.currentUser?.id;  // Using optional chaining to avoid crashing
    if (!userId) {
    return res.status(400).json({ message: "Session or user ID is missing" });
    }
    // const userId = req.session.currentUser.id;

    //Update user in the database with new tokens
    const updatedUser = await Users.findByIdAndUpdate(userId, {
        fitbitAccessToken: access_token,
        fitbitRefreshToken: refresh_token,
        fitbitTokenExpiration: new Date(Date.now() + expires_in * 1000)
    }, {new: true})

    res.redirect("http://localhost:3000/login");

   } catch(error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ message: "Error linking Fitbit account "})
   }
}

module.exports = {
    generateAuthenticationUrl,
    handleFitbitRedirect
}