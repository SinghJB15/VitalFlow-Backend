const express = require("express");
const router = express.Router();
const {fitbitCtrl} = require("../controllers");

//User Profile
router.get("/profile", fitbitCtrl.fetchFitbitProfile);
router.get("/devices", fitbitCtrl.fetchFitbitDevices);
router.get("/heartrate", fitbitCtrl.fetchFitbitHeartrate);
router.get("/ecg", fitbitCtrl.fetchFitbitEcg);
router.get("/activities", fitbitCtrl.fetchFitbitActivities)

module.exports = router;