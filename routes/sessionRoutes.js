const express = require("express");
const router = express.Router();
const {sessionsCtrl}  = require("../controllers")

//session routes
router.get("/verify-session", sessionsCtrl.verifySession);
router.post('/', sessionsCtrl.session);
router.post('/logout', sessionsCtrl.deleteSession);

module.exports = router