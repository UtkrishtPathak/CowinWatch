
//importing the required modules
const Subs  = require("../schema/Subscribe_schema"),
      Users = require("../schema/User_schema");

module.exports =
{
    execute(message,command)
    {
        Users.find({name:message.author.username}, function(err,docs)
        {
            if(docs.length)
            {
                if(command=="on") //when command given is on
                {
                    //checking for user records in SUBS collection
                    Subs.find({name:message.author.username}, function(err,docs)
                    {
                        if(docs.length) //if record exists
                        {
                            message.channel.send("You are already subscribed to hourly updates");
                        }
                        else //if record doesn't exist
                        {
                            //creating a new sub record with thier names
                            var sub = new Subs({name:message.author.username});
                    
                            //saving the sub in SUBS collection
                            sub.save(function(err,doc)
                            {
                                if(err) return console.log(err);
                            });

                            message.channel.send("You are now subscribed to hourly updates");
                        }
                    })
                }

                else
                {
                    Subs.find({name:message.author.username}, function(err,docs)
                    {
                        if(docs.length) //if record exists
                        {
                            //deleting that record form SUBS collection
                            Subs.deleteOne({name:message.author.username}, function(err)
                            {
                                if(err) console.log(err);
                                else
                                    message.channel.send("You are unsubscribed from hourly updates"); 
                            })
                        
                        }
                        else //if record doesn't exist
                        {
                            message.channel.send("You are already unsubscribed from hourly updates");
                        }
                    })
                }
            }
            else
            {
                message.channel.send("User not yet registered.");
            }
        })   
    }
}