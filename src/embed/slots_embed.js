
module.exports = {
    execute_com(message,slot,today,Discord) //this function is for creating discord embeds for *slots commmands
    {
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FA0707") //setting the color of the embed
        .setTitle("SLOTS") //setting the title of the embed
        .addFields(
            {
                name:`${slot.name}`,
                value:`Block:${slot.block_name}, PIN:${slot.pincode}.\n
                Vaccine: ${slot.sessions[0].vaccine}.\n Total ${slot.sessions[0].available_capacity} slots are available on ${today} 
                (Dose 1: ${slot.sessions[0].available_capacity_dose1}, Dose 2: ${slot.sessions[0].available_capacity_dose2}).\n\n
                COWIN: [https://selfregistration.cowin.gov.in/](https://selfregistration.cowin.gov.in/)`
            }
        );
            message.author.send(newEmbed); //sending the embed to the author of the message who gave the command in the DM
    },

    // execute_pin(message,slot,today,Discord) //this function is for creating discord embeds for *pin commmand
    // {
    //     const newEmbed = new Discord.MessageEmbed()
    //     .setColor("#FA0707") //setting the color of the embed
    //     .setTitle("SLOTS") //setting the title of the embed
    //     .addFields(
    //         {
    //             name:`${slot.name}`,
    //             value:`${slot.state_name}, PIN:${slot.pincode}.\n
    //             Age:${slot.sessions[0].min_age_limit}+\n
    //             Vaccine: ${slot.sessions[0].vaccine}.\n Total ${slot.sessions[0].available_capacity} slots are available on ${today} 
    //             (Dose 1: ${slot.sessions[0].available_capacity_dose1}, Dose 2: ${slot.sessions[0].available_capacity_dose2}).\n\n
    //             COWIN: [https://selfregistration.cowin.gov.in/](https://selfregistration.cowin.gov.in/)`
    //         }
    //     );
    //         message.author.send(newEmbed); //sending the embed to the author of the message who gave the command in the DM
    // },

    execute_auto(client,slot,today,ch,Discord) //this function is for creating discord embeds for hourly notifications about slots availability
    {
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FA0707") //setting the color of the embed
        .setTitle("SLOTS") //setting the title of the embed
        .addFields(
            {
                name:`${slot.name}`,
                value:`${slot.block_name}, PIN:${slot.pincode}.\n
                Vaccine: ${slot.sessions[0].vaccine}.\n Total ${slot.sessions[0]. available_capacity} slots are available on ${today} 
                (Dose 1: ${slot.sessions[0].available_capacity_dose1}, Dose 2: ${slot.sessions[0].available_capacity_dose2}).\n\n
                COWIN: [https://selfregistration.cowin.gov.in/](https://selfregistration.cowin.gov.in/)`
            }
        );

        //sending the embed to the author of the message who gave the command in the DM
        client.channels.fetch(ch)
        .then(channel => channel.send(newEmbed))
        .catch(console.error);
    }
}