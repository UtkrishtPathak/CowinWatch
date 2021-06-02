
//importing required modules
const slots_embed = require("../embed/slots_embed.js");
const axios = require("axios");

module.exports =
{
    execute(message,args,Discord)
    {
        
        //to get the current date in the format dd-mm-yyyy from US time to India time
        var today = new Date();
        console.log(today);
        let obj = new Intl.DateTimeFormat('en-US', {timeZone: "Asia/Kolkata"});
        let ind_time = obj.format(today);
        console.log(ind_time);
        var d=ind_time.split("/");
        var mm = String(d[0]).padStart(2, '0');
        var dd = String(d[1]).padStart(2, '0');
        var yyyy = String(d[2]);
        ind_time = dd+"-"+mm+"-"+yyyy;
        console.log(ind_time);
        
        //sending http request to fetch slots available today in all the centres in the pincode given by the user
        axios
        .get(`https://cowin.rabeeh.me/api/v2/appointment/sessions/public/findByPin?pincode=${args[0]}&date=${ind_time}`,
        { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}})
        
        .then(function(response)  //response recieved from the "GET" request sent
        {
            var centres=response.data.data.sessions;  //storing the centres data
            var n=0;  //to check whether no centres have any available capacity

            //A forEach loop for getting individual centres from the given list of centres
            centres.forEach((centre) =>
            {
                //checking for available slots in individual centres
                if(centre.available_capacity>0)
                {
                    slots_embed.execute_com(message,centre,today,Discord);
                    n=1;  //if any centre has non-zero slots available, make it 1
                }
            });

            //when no centres have available slots
            if(n==0)
                message.author.send("No slots available")
        })
        
        .catch(function(error)  //if any error occurs while sending http request or recieving the response
        {
            console.log(error);
        })
    }
}