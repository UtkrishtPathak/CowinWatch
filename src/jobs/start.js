
//importing required modules
const User  = require("../schema/User_schema");

module.exports =
{
    execute(message)
    {
        /*Checking if the user is already registered(i.e, already provided his/her/their details)
        by fetching records of the user from the "User" collection */
        User.find({name:message.author.username}, function(err,docs) {
            if(docs.length) //if the record fetched is non-empty, it implies user is registered
            {
                message.channel.send(`<@${message.author.id}> You are already registered. You must be recieving all the slots details in your DM. Please check.`);
            }
            else //if the record is empty
            {
                message.author.send("Hi there! This is where we will chat. I mean you will give me commands and I will obey it.\nPlease press *help to get details of all the commands.\nYou must register yourself first if you wan to use my features.")
                .then((response) => message.channel.send(`<@${message.author.id}> A message has been sent to you`))
                .catch((error) => message.channel.send(`<@${message.author.id}> You have disabled recieving DMs. Please enable it to use my features`));
                
            }
        });
    }
}