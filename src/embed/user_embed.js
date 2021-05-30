
module.exports = {
    execute(message,docs,Discord) //this function is to give details about the registered user
    {
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FA0707") //setting the color of the embed
        .setTitle("User details") //setting the title of the embed
        .addFields(
            {
                name:"Name",
                value:`${docs[0].name}`
            },
            {
                name:"Age",
                value:`${docs[0].age} years`
            },
            {
                name:"District",
                value:`${docs[0].district_name}`
            }
        );

        message.channel.send(newEmbed); //sending the embed to the author of the message who gave the command in the DM
    }
}