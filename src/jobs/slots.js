
//importing the required modules
const User          = require("../schema/User_schema.js"),
      slots_embed   = require("../embed/slots_embed.js");

module.exports =
{
    execute(message,axios,Discord)
    {
        //fetching the records of the user from USER collection
        User.find({name:message.author.username}, function(err,docs)
        {
            if(docs.length) //if the records are not empty, then the user is already registered
            {
                dist_id = docs[0].district_id; //storing the district_id

                //to get the current date in the format dd-mm-yyyy
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = dd+"-"+mm+"-"+yyyy;
                
                 //sending http request to fetch slots available today in all the centres in the district of each user stored from the database
                axios
                .get(`https://cowin.rabeeh.me/api/v2/appointment/sessions/public/findByDistrict?district_id=${dist_id}&date=${today}`,
                    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}})
                .then(function (response) //response recieved from the "GET" request sent
                    {
                        var centres=response.data.sessions;  //storing the centres data
                        var n=0;  //to check whether no centres have any available capacity

                        //A forEach loop for getting individual centres from the given list of centres
                        centres.forEach((centre) => 
                        {
                            if(centre.available_capacity>0)
                            {
                                slots_embed.execute_com(message,centre,today,Discord);
                                n=1;  //if any centre has non-zero slots available, make it 1
                            }
                        });
                        
                        if(n==0)
                            message.author.send("No slots avialable")
                            .catch(error =>
                            {
                                message.channel.send(`<@${message.author.username} You have disabled the settings to accept DMs. Kindly enable it to use my features`);
                            });
                    })
                .catch(function(error) 
                    {
                        // handle error
                        console.log("ERROR");
                        console.log(error);
                    }); 
            }
            else
            {
                message.author.send("User not yet registered.")
                .catch(error =>
                {
                    message.channel.send(`<@${message.author.username} You have disabled the settings to accept DMs. Kindly enable it to use my features`);
                });
            }
        });
    }
}