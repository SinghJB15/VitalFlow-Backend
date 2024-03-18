const express = require("express");
const FoodJournal = require("../models/FoodJournal");
const Users = require("../models/Users");

//Create journal
const createJournal = async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const { date, breakfast, lunch, dinner, snacks } = req.body;

      //Create the journal entry
      const newJournal = await FoodJournal.create({
        user: req.session.currentUser.id,
        date,
        breakfast,
        lunch,
        dinner,
        snacks
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
    const journalId = req.params.id;
    console.log("journalId:", journalId);
    const { date, breakfast, lunch, dinner, snacks } = req.body;

    //Manually calculate total calories
    const totalCalories = Number(breakfast) + Number(lunch) + Number(dinner) + Number(snacks);

    //Find journal by id and update
    try {
      const updatedJournal = await FoodJournal.findByIdAndUpdate(journalId, {
        date,
        breakfast,
        lunch,
        dinner,
        snacks,
        totalCalories
      }, {new: true});

        //Success
        res.status(200).json({
            message: "Journal entry added successfully",
        });
    } catch (error) {
      res.status(500).json({ message: "Error updating journal date", error });
    }
  };

  //Delete Journal
  const deleteJournal = async (req, res) => {
    const journalId = req.params.id;
    console.log("journalId:", journalId)
    
    //Find journal id and delete
    try {
      const deletedJournalEntry = await FoodJournal.findByIdAndDelete(journalId);

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
            { user: req.session.currentUser.id });

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