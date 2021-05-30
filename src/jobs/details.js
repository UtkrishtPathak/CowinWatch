
// importing the required modules
const User       = require("../schema/User_schema.js"),
      user_embed = require("../embed/user_embed");


module.exports =
{

    execute(message,Discord)
    {
        //fetching the records of the user who sent the message from USER collection
        User.find({name:message.author.username}, function(err,docs)
        {
            if(docs.length)  //if the records are not empty, then the user is registered
            {
                user_embed.execute(message,docs,Discord);
            }
            else
            {
                message.author.send("User not yet registered.");
            }
        })
    },

    
}