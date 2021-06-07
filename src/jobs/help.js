
module.exports = 
{
    execute(message, Discord)
    {
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FA0707") //setting the color of the embed
        .setTitle("Commands") //setting the title of the embed
        .setDescription("All the commands are as follows")
        .addFields(
            {
                name:"1. *help - to view all commands",
                value:"Registration not required to use this command"
            },
            {
                name:"2. *start - to begin the registration process and private message between bot and user",
                value:"One time use command. Not required after registration."
            },
            {
                name:"3. *register <age> <district> - to register a user with age and district",
                value:"For eg. *register 20 ernakulam \nThis registers a user in group of 18+ and in district Ernakulam"
            },
            {
                name:"4. *my_det - to get details of registered user",
                value:"REGISTRATION REQUIRED"
            },
            {
                name:"5. *upd <age> - to update a user's age (REGISTRATION REQUIRED)",
                value:"For eg. *upd 45\n This changes the age of user to 45"
            },
            {
                name:"6. *upd <district> - to update a user's district (REGISTRATION REQUIRED)",
                value:"For eg. *upd Thrissur\n This changes the district of user to Thrissur"
            },
            {
                name:"7. *slots - gives the slots of the selected district (REGISTRATION REQUIRED)",
                value:"User can give this command to get slots availability in the DM"
            },
            {
                name:"8. *on - subscribes you to hourly updates of available slots",
                value:"REGISTRATION REQUIRED"
            },
            {
                name:"9. *off - unsubscribes you from recieving hourly updates of available slots",
                value:"REGISTRATION REQUIRED"
            }
            
        );

        message.channel.send(newEmbed); //sending the embed to the author of the message who gave the command
    }
}