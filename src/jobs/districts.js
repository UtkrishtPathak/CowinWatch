const States    = require("../schema/State_schema"),
      Districts = require("../schema/District_schema"),
      axios     = require("axios");
      
module.exports =
{
    //https://cdn-api.co-vin.in/api/v2/admin/location/districts/16
    execute()
    {
        States.find({},function(err,docs)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                docs.forEach(state =>
                {
                    axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.state_id}`,
                    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}})
                    .then(function(response)
                    {
                        dist = response.data.data.districts;
                        dist.forEach(d =>
                        {
                          d.state_id=state.state_id;  
                        });
                        Districts.insertMany(dist)
                        .then(function()
                        {
                            console.log("Data inserted");
                        })
                        .catch(function(err)
                        {
                            console.log(err);
                        })
                    
                    })
                    .catch(function(error)
                    {
                        console.log(error);
                    })
                })
            }
        })
    }
}