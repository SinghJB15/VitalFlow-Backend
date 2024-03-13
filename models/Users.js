const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fitbitAccessToken: {
        type: String,
        default: null,
        select: false
    },
    fitbitRefreshToken: {
        type: String,
        default: null,
        select: false
    },
    fitbitTokenExpiration: {
        type: Date,
        default: null,
        select: false
    },
    journals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodJournal"
    }]
})

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;