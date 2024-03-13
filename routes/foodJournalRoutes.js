const express = require("express");
const router = express.Router();
const {foodJournalCtrl} = require("../controllers");

//Food journal
router.get("/", foodJournalCtrl.getAllJournals);
router.post("/new", foodJournalCtrl.createJournal);
router.put("/:id", foodJournalCtrl.editJournalDate);
router.delete("/:id", foodJournalCtrl.deleteJournal);

module.exports = router;