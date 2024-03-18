const mongoose = require("mongoose");

const FoodJournalSchema = new mongoose.Schema({
  date: Date,
  breakfast: Number,
  lunch: Number,
  dinner: Number,
  snacks: Number,
  totalCalories: {
    type: Number,
    default: function () {
      return this.breakfast + this.lunch + this.dinner + this.snacks;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const FoodJournal = mongoose.model("FoodJournal", FoodJournalSchema);
module.exports = FoodJournal;
