const express = require("express");
const router = express.Router();
const fitbitAuthCtrl = require("../controllers/fitbitAuthCtrl");

//User Authentication URL
router.get("/authorize", (req, res) => {
    const authUrl = fitbitAuthCtrl.generateAuthenticationUrl();
    res.json({ url: authUrl });
});

//Redirect URL
router.get("/", fitbitAuthCtrl.handleFitbitRedirect);

module.exports = router