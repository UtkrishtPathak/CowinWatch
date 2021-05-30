
//importing required modules
const mongoose = require("mongoose");

//creating the Schema for the collection "STATES"
const Schema = new mongoose.Schema(
    {
        state_id: Number, //storing state id
        state_name: String //storing state name
    }
);

module.exports = mongoose.model("States", Schema);