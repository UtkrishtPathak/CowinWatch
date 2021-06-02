//importing required modules

const Districts     = require("../schema/District_schema.js"),
      User          = require("../schema/User_schema.js");

module.exports =
{
    execute(message,args)
    {
        if(!isNaN(args[0])) //checking whether the argument is a number or not
        {
            //If the argument is a valid number, then the user is trying to update his/her/their age
            
            if(args.length!=1) //checking whether correct no. of arguments was provide or not
            {
                message.author.send("Incorrect number of parameters. Maybe some extra space is there. Check and try again");
                return;
            }

            if(!(args[0]>=18 && args[0]<150)) //checking if the age is in valid range or not
            {
                message.author.send("Incorrect value of age. Please provide correct age.");
                return;
            }
            
            //fetching the records of the user from USER collection
            User.find({name:message.author.tag}, function(err,docs)
            {
                if(!docs.length) //if the records are empty, then the user is not registered
                {
                    message.author.send("User not yet registered. Please register first.");
                    return;
                }
                else //if the records are found
                {
                    //updating the age of the user to the value of the args
                    User.updateOne({name:message.author.tag},{age:args[0]},function(err,res)
                    {
                        if(err)
                            console.log(err);
                        else 
                        {
                            message.author.send("Your information has been updated succesfully.");
                        }
                    });
                }
            });
        }
        
        else
        {
            /*If the number is not a valid number, which means the user has not entered a number but a district
            which means that the user eants to update his.her/their district*/
            
            if(args.length!=1)  //checking whether correct no. of arguments was provide or not
            {
                message.author.send("Incorrect number of parameters. Maybe some extra space is there. Check and try again");
                return;
            }
            
            //converting the args(district name) provided by the user to Camelcase
            args[0]=args[0].toLowerCase();
            args[0]=args[0].charAt(0).toUpperCase()+args[0].slice(1);

            //checking whether the district provided by the user is a valid district or not
            Districts.find({district_name:args[0]}, function(err,docs)
            {
                if(!docs.length) //if record is empty, then the district name was invalid
                {
                    message.author.send("Incorrect district details");
                    return;
                }
                else
                {
                    var dist = docs[0].district_id;

                    //fetching the records of the user from USER collection
                    User.find({name:message.author.tag}, function(err,docs)
                    {
                        if(!docs.length) //if the records are empty, then the user is not registered
                        {
                            message.author.send("User not yet registered. Please register first.");
                            return;
                        }
                        else //if the records are found
                        {
                            //updating the district of the user to the value of the args
                            User.updateOne({name:message.author.tag},{district_id:dist,district_name:args[0]},function(err,res)
                            {
                                if(err)
                                    console.log(err);
                                else 
                                {
                                    message.author.send("Your information has been updated succesfully.");
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}