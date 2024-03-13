const mongoose = require("mongoose");

const FoodJournalSchema = new mongoose.Schema({
    date: Date,
    user: {
        type: Schema.Types.ObjectId, ref: "Users"
    },
    meals: [{
        type: Schema.Types.ObjectId, ref: "MealEntry"
    }]
});

const FoodJournal = mongoose.model("FoodJournal", FoodJournalSchema);
module.exports = FoodJournal;