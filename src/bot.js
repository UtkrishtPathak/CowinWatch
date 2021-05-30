
//importing the required modules
require("dotenv").config();
const axios         = require("axios"),
      Discord       = require('discord.js'),
      express       = require("express"),
      app           = express(),
      client        = new Discord.Client(),
      mongoose      = require('mongoose'),
      User          = require("./schema/User_schema.js"),
      cron          = require("node-cron"),
      start         = require("./jobs/start.js"),
      slots         = require("./jobs/slots.js"),
      details       = require("./jobs/details.js"),
      help          = require("./jobs/help.js"),
      register      = require("./jobs/register.js"),
      pin           = require("./jobs/pin.js"),
      subscribe     = require("./jobs/subscribe.js"),
      update        = require("./jobs/update.js");
      auto          = require("./jobs/automatic.js");
      db_url        = process.env.DB_URL;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.static(__dirname + "/public"));


//when the bot is ready to work
client.on("ready",() => 
{
    console.log(`${client.user.tag} has logged in`);
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

//hello message on entering a new server
client.on("guildCreate", guild => 
{
    let found = 0;
    guild.channels.cache.map((channel) => 
    {
        if (found === 0)
        {
          if (channel.type === "text")
          {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true)
            {
              if (channel.permissionsFor(client.user).has("SEND_MESSAGES") === true)
              {
                channel.send("Hola! I am CowinWatch. I give you updates regarding slot availability in cowin vaccinations.");
                channel.send("Press *help to see all my commands. Press *start to negin the registration process in your DMs.");
                channel.send("All conversations between you and me will take place in DMs, so if you have disabled it from recieving messages, kindly enable it.");
                found = 1;
              }
            }
          }
        }
    });
   
})

//when a new member is added to the server
client.on("guildMemberAdd",member => 
{
    channel_id=member.guild.systemChannelID; //getting the id of the general channel

    //sending a welcome message to the member
    client.channels.cache.get(channel_id).send(`WELCOME <@${member.id}>. I am the Corona bot.
    You can use my features and get notified with available cowin vaccinations slots. Press *help to get all the details.
    Please send *start to begin the process.`);
});


//when a member leaves\banned\kicked from the server
client.on("guildMemberRemove",(member) => 
{
    //removing data of members from the database
    User.deleteOne({name:member.user.username},function(err)
    {
        if(err)
            console.log(err);
    });
});

//getting the prefix that the bot uses to identify its commands
const prefix=process.env.PREFIX;

//event listener when a message is sent by the user
client.on("message",(message) => 
{
    //whether prefix is used or not
    if(message.author.bot||!message.content.startsWith(prefix))
        return;

    //separating the command and the arguments from the message    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //checking which command was requested and the corresponding function is executed
    if(message.channel.type=="dm")
    {
        if(command==="help")
        {
            help.execute(message,Discord);
        }

        if(command==="register")
        {
            register.execute(message,args);
        }

        if(command==="my_det")
        {
            details.execute(message,Discord);
        }

        if(command==="upd")
        {
            update.execute(message,args);
        }

        if(command==="slots")
        {
            slots.execute(message,axios,Discord);
        }

        if(command=="pin")
        {
            pin.execute(message,args,axios,Discord);
        }

        if(command=="on"||command=="off")
        {
            subscribe.execute(message,command);
        }
    }

    else
    {
        if(command==="start")
        {
           start.execute(message);
        }
        else if(command==="help")
        {
            help.execute(message,Discord);
            message.channel.send(`<@${message.author.id}>All the conversations between us will happen in the DMs. Press *start if you haven't registered yet. See you there.`);
        }
        else
        {
           message.channel.send(`<@${message.author.id}>All the conversations between us will happen in the DMs. Press *start if you haven't registered yet. See you there.`)
        }
    }
});

//scheduling houlry notifications for slots availability
cron.schedule("0 0 */1 * * *", () => {
    auto.execute(axios,client,Discord);
})

//logging in the client
client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(8888, function()
{
    console.log("running on port 8888");
})