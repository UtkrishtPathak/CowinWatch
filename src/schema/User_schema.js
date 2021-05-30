
//importing required modules
const mongoose = require("mongoose");

//creating the Schema for the collection "USER"
const Schema = new mongoose.Schema(
    {
        name: String, //storing name
        age: Number, //storing age
        district_id: Number, //storing id of the district according to the Districts collection
        district_name: String, //storing the district name
        channel:String, //storing the id of the personal(DM) channel between the bot and the user
    }
);

module.exports = mongoose.model("User", Schema); 