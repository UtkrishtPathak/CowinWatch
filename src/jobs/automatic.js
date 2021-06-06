
// importing the required modules
const User          = require("../schema/User_schema.js"),
      slots_embed   = require("../embed/slots_embed.js"),
      Subs          = require("../schema/Subscribe_schema"),
      axios         = require("axios");

module.exports =
{
    execute(client,Discord)
    {
        console.log("running"); //to check the execution status

        //Getting all the records from the collection User
        User.find({},function(err,docs) // records are stored in docs
        {
            //if any error occurs while fetching from database
            if(err)
            {
                console.log(err);
            }
            else
            {
                //A forEach loop to get individual records of docs in "user"
                docs.forEach(user => 
                {
                    Subs.find({name:user.name}, function(err,docs)
                    {
                        if(docs.length)
                        {
                            //to get the current date in the format dd-mm-yyyy from US time to India time
                            var today = new Date();
                            let obj = new Intl.DateTimeFormat('en-US', {timeZone: "Asia/Kolkata"});
                            let ind_time = obj.format(today);
                            var d=ind_time.split("/");
                            var mm = String(d[0]).padStart(2, '0');
                            var dd = String(d[1]).padStart(2, '0');
                            var yyyy = String(d[2]);
                            ind_time = dd+"-"+mm+"-"+yyyy;
                                                        
                            //sending http request to fetch slots available today in all the centres in the district of each user stored from the database
                            axios
                            .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${user.district_id}&date=${ind_time}`,
                            { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}})
                            
                            .then(function (response) //response recieved from the "GET" request sent
                            {
                                centres=response.data.centers; //storing the centres data
                                var n=0; //to check whether no centres have any available capacity

                                //A forEach loop for getting individual centres from the given list of centres
                                centres.forEach((centre) => 
                                {
                                    //checking for available slots in individual centres
                                    if(centre.sessions[0].available_capacity>0 && user.age>=centre.sessions[0].min_age_limit) 
                                    {
                                        slots_embed.execute_auto(client,centre,ind_time,user.channel,Discord);
                                        n=1; //if any centre has non-zero slots available, make it 1
                                    }
                                })

                                //when no centres have available slots
                                if(n==0)   
                                    client.channels.fetch(user.channel)
                                    .then(channel => channel.send("NO SLOTS AVAILABLE."))
                                    .catch(error => console.log(error));      
                            })
                            
                            .catch(function (error) //if any error occurs while sending http request or recieving the response
                            {
                                // handle error
                                console.log("ERROR");
                                console.log(error);
                            }) 
                        }
                    });
                      
                });
            }
        })
    }
}