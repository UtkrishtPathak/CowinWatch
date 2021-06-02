
//importing the required modules
const Districts     = require("../schema/District_schema.js"),
      User          = require("../schema/User_schema.js");

module.exports = 
{
    execute(message,args)
    {
        if(args.length!=2)  //checking whether correct no. of arguments was provide or not
        {
            message.author.send("Incorrect number of parameters. Maybe some extra space is there. Check and try again")
            return;
        }

        if(!(args[0]>=18 && args[0]<150))  //checking if the age is in valid range or not
        {
            message.author.send("Incorrect value of age. Please provide correct age.");
            return;
        }
        
        //converting the args(district name) provided by the user to Camelcase
        args[1]=args[1].toLowerCase();
        args[1]=args[1].charAt(0).toUpperCase()+args[1].slice(1);
        console.log(args[1]);

        //checking whether the district provided by the user is a valid district or not
        Districts.find({district_name:args[1]}, function(err,docs)
        {
            if(docs.length==0)  //if record is empty, then the district name was invalid
            {
                message.author.send("Incorrect district details");
                return;
            }
            else
            {
                var dist = docs[0].district_id;

                //fetching the records of the user from USER collection
                User.find({name:message.author.username}, function(err,docs)
                {
                    if(docs.length)  //if the records are not empty, then the user is already registered
                    {
                        message.author.send("User is already registered. If you want to see your details use my_det command. If you want to change your details use update command.");
                    }
                    else
                    {
                        //creating a new user record with the details according to the arguments provided
                        var user = new User({name:message.author.username,age:args[0],district_id:dist,district_name:args[1],channel:message.channel.id});

                        //saving the new user to the USER collection
                        user.save(function(err,data)
                        {
                            if(err) return console.log(err);
                        });
                        message.author.send("Registration done successfully.\nYou can now see and update your details from this dm.\nYou will be recieving updates about slots availability in your district in this DM only.\nEnjoy");
                        message.author.send("Do you want to get hourly updates? Press *on to subscribe.");
                    }
                });  
            }
        });
    }
}