const express = require("express");
const router = express.Router();
const {mealEntryCtrl} = require("../controllers");

//Meal Entry
router.post("/", mealEntryCtrl.createMealEntry);
router.put("/:id", mealEntryCtrl.updateMealEntry);
router.delete("/:id", mealEntryCtrl.deleteMealEntry);

module.exports = router;