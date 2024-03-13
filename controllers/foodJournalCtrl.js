const express = require("express");
const FoodJournal = require("../models/FoodJournal");
const MealEntry = require("../models/MealEntry");
const Users = require("../models/Users");

//Create journal
const createJournal = async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const { date } = req.body;

      //Create the journal entry
      const newJournal = await FoodJournal.create({
        user: req.session.currentUser.id,
        date,
        meals: []
      });

      //Update the users database with the new journal
      await Users.findByIdAndUpdate(req.session.currentUser.id, 
            { $push: { journals: newJournal._id }},
            { new: true }
        );

      //Success
      res.status(200).json({
        message: "Journal created successfully",
        data: newJournal
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating journal", error });
    }
  };

  //Edit Journal
  const editJournalDate = async (req, res) => {
    const { journalId } = req.params;
    const { newDate } = req.body;
    
    //Find journal by id and update
    try {
      const updatedJournal = await FoodJournal.findByIdAndUpdate(journalId, 
        { date: newDate }, { new: true });

        //Success
        res.status(200).json({
            message: "Journal entry added successfully",
            data: updatedJournal
        });
    } catch (error) {
      res.status(500).json({ message: "Error updating journal date", error });
    }
  };

  //Delete Journal
  const deleteJournal = async (req, res) => {
    const { journalId } = req.params;
    
    //Find journal id and delete
    try {
      const deletedJournalEntry = await FoodJournal.findByIdAndDelete(id);

      if(!deletedJournalEntry) {
        return res.status(404).json ({ message: "Journal entry not found"})
      };

      //Find the food journal id in the users database and remove it
      await Users.findByIdAndUpdate(req.session.currentUser.id,
        { $pull: {journals: journalId }},
        { new: true }
      );

      //Success
      res.status(200).json({ message: "Journal removed successfully "});
    } catch (error) {
      res.status(500).json({ message: "Error deleting journal", error });
    }
  };

  //Fetch all Journals for user
  const getAllJournals = async(req, res) => {
    if(!req.session.currentUser) {
        return res.status(401).json( { message: "Unauthorized" })
    };

    //Find journals specific to user id
    try {
        const journals = await FoodJournal.find(
            { user: req.session.currentUser.id }).populate("meals")

        //Success
        res.status(200).json({
            message: "Fetched all journals successfully",
            data: journals
        })
    } catch (error) {
        console.error("failed to fetch journals", error);
        res.status(500).json( { message: "Failed retriece journals "})
    }
  }

  module.exports = {
    createJournal,
    editJournalDate,
    deleteJournal,
    getAllJournals
  }