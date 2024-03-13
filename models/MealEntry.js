const mongoose = require("mongoose");

const MealEntrySchema = new mongoose.Schema({
    type: String, //e.g, breakfast, lunch, etc
    name: String,
    calories: Number
})

const MealEntry = mongoose.model("MealEntry", MealEntrySchema);
module.exports = MealEntry;