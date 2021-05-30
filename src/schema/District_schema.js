
//importing required modules
const mongoose = require("mongoose");

//creating the Schema for the collection "DISTRICT"
const Schema = new mongoose.Schema(
    {
        district_id: Number, //storing dostrict id
        district_name: String, //storing district name
        state_id: Number //storing corresponding state name
    }
);

module.exports = mongoose.model("District", Schema);