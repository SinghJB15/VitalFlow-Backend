const express = require("express");
const FoodJournal = require("../models/FoodJournal");
const MealEntry = require("../models/MealEntry");

//Create a meal entry and add it to the food journal
const createMealEntry = async(req, res) => {
    if(!req.session.currentUser) {
        return res.status(401).json({ message: "No active session "});
    }

    try {
        const { type, name, calories, journalDate } = req.body;
        
        //Create the meal entry
        const newMealEntry = await MealEntry.create( {type, name, calories });

        //Find or create a food journal for the current user and the specified date
        const journal = await FoodJournal.findOneAndUpdate(
            { user: req.session.currentUser.id, date: journalDate},
            { $push: { meals: newMealEntry._id } },
            { new: true, upsert: true } //Creaate a new journal if it does not exist
        )

        //Success
        res.status(201).json({
            message: "Meal Entry added successfully",
            journal: journal
        })
    } catch(error) {
        console.error("Failed to add meal entry", error);
        res.status(500).json({ message: "Failed to add meal entry "});
    }
}

//Update meal entry
const updateMealEntry = async(req, res) => {
    const { id } = req.params;
    const { type, name, calories } = req.body;

    if(!req.session.currentUser) {
        return res.status(401).json({ message: "Not Authorized "})
    };

    //Find the meal entry by its id and update
    try {
        const updatedMealEntry = await MealEntry.findByIdAndUpdate(id, {
            type,
            name,
            calories
        }, { new: true });

        //Success
        res.status(200).json({
            message: "Meal entry updated successfully",
            data: updatedMealEntry
        })
    } catch(error) {
        console.error("Failed to update meal entry", error);
        res.status(500).json({ message: "Error updating meal entry "});
    }
}

//Delete meal entry
const deleteMealEntry = async(req, res) => {
    const { id } = req.params;

    if(!req.session.currentUser) {
        return res.status(401).json({ message: "Not authorized"})
    }

    //Find meal entry by id and delete
    try{
        const deletedMealEntry = await MealEntry.findByIdAndDelete(id);
         
        if(!deletedMealEntry) {
            return res.status(404).json( { message: "Meal entry not found "})
        };

        //Find the food journal for currnet user and remove meal entry Id
        await FoodJournal.findOneAndUpdate(
            { user: req.session.currentUser.id, meals: id },
            { $pull: { meals: id }},
            { new: true }
        );

        //Success
        res.status(200).json({ message: "Meal entry deleted successfully "})
    } catch (error) {
        console.error("failed to delete meal entry", error);
        res.status(500).json( { message: "Failed to delete meal entry "})
    }
}

module.exports = {
    createMealEntry,
    updateMealEntry,
    deleteMealEntry
};