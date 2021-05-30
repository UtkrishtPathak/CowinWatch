
//importing required modules
const mongoose = require("mongoose");

//creating the Schema for the collection "Subscribers"
const Schema = new mongoose.Schema(
    {
        name: String //storing names of those registered users who have subscribed for hourly updates
    }
);

module.exports = mongoose.model("Subs", Schema);