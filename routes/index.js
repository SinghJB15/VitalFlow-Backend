const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes.js");
const sessionRoutes = require("./sessionRoutes.js");
const fitbitAuthRoutes = require("./fitbitAuthRoutes.js");
const fitbitDataRoutes = require("./fitbitDataRoutes.js");

router.use("/user", userRoutes);
router.use("/session", sessionRoutes);
router.use("/fitbit/data", fitbitDataRoutes);
router.use("/auth/fitbit/callback", fitbitAuthRoutes);

module.exports = router;