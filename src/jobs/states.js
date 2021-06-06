const axios = require("axios");
const States = require("../schema/State_schema.js");

module.exports =
{
    execute()
    {
        axios
        .get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`,
            { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}})
        .then(function(response)
        {
            console.log(response.data.data.states);
            States.insertMany(response.data.data.states)
            .then(function()
            {
                console.log("States added");
            })
            .catch(function(error)
            {
                console.log("error");
            })
        })
    }
}