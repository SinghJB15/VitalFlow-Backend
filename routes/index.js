const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes.js");
const sessionRoutes = require("./sessionRoutes.js");
const fitbitAuthRoutes = require("./fitbitAuthRoutes.js");
const fitbitDataRoutes = require("./fitbitDataRoutes.js");
const foodJournalRoutes = require("./foodJournalRoutes.js");
const mealEntryRoutes = require("./mealEntryRoutes.js");

router.use("/user", userRoutes);
router.use("/session", sessionRoutes);
router.use("/fitbit/data", fitbitDataRoutes);
router.use("/auth/fitbit/callback", fitbitAuthRoutes);
router.use("journal", foodJournalRoutes);
router.use("/meal", mealEntryRoutes);

module.exports = router;