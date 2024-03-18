const express = require("express");
const axios = require("axios");
const Users = require("../models/Users");

//Fetch Fitbit profile
const fetchFitbitProfile = async(req, res) => {
    const user = await Users.findById(req.session.currentUser.id).select('+fitbitAccessToken');
    const accessToken = user.fitbitAccessToken;

    console.log("Session:", req.session.currentUser.id);
    console.log("accesstoken:", accessToken);

    //Fetch user profile
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/-/profile.json", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
        return res.status(200).json({
            message: "User profile fetched successfully",
            data: response.data
        })
    } catch(error) {
        console.error("Error fetching Fitibit profile:", error);
        res.status(500).json({
            message: "Failed to fetch Fitbit profile"
        })
    }
}   

const fetchFitbitDevices = async(req, res) => {
    const user = await Users.findById(req.session.currentUser.id).select('+fitbitAccessToken');
    const accessToken = user.fitbitAccessToken;

    //Fetch Devices listed to users account
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/-/devices.json", {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return res.status(200).json({
            message: "User devices fetched successfully",
            data: response.data
        })
    } catch(error) {
        console.error("Error fetching user devices:", error);
        res.status(500).json({
            message: "Failed to fetch user devices"
        })
    }
}

const fetchFitbitHeartrate = async(req, res) => {
    const user = await Users.findById(req.session.currentUser.id).select('+fitbitAccessToken');
    const accessToken = user.fitbitAccessToken;

    //Fetch users heart rate data
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json", {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return res.status(200).json({
            message: "User Devices fetched successfully",
            data: response.data
        })
    } catch(error) {
        console.error("Error fetching user heart rate:", error);
        res.status(500).json({
            message: "Failed to fetch user heartrate"
        })
    }
}

const fetchFitbitEcg = async(req, res) => {
    const user = await Users.findById(req.session.currentUser.id).select('+fitbitAccessToken');
    const accessToken = user.fitbitAccessToken;

    //Fetch users heart rate data
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/-/ecg/list.json?beforeDate=2024-03-15&sort=desc&limit=1&offset=0", {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return res.status(200).json({
            message: "User ECG fetched successfully",
            data: response.data
        })
    } catch(error) {
        console.error("Error fetching user ECG:", error);
        res.status(500).json({
            message: "Failed to fetch user ECG"
        })
    }
}

const fetchFitbitActivities = async(req, res) => {
    const user = await Users.findById(req.session.currentUser.id).select('+fitbitAccessToken');
    const accessToken = user.fitbitAccessToken;

    //Fetch users heart rate data
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/-/activities/date/today.json", {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return res.status(200).json({
            message: "User activities fetched successfully",
            data: response.data
        })
    } catch(error) {
        console.error("Error fetching user activities:", error);
        res.status(500).json({
            message: "Failed to fetch user activities"
        })
    }
}



//

module.exports = {
    fetchFitbitProfile,
    fetchFitbitDevices,
    fetchFitbitHeartrate,
    fetchFitbitEcg,
    fetchFitbitActivities
};