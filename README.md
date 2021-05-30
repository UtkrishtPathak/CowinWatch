# CowinWatch

A discord bot to provide notifications regarding slots availability in Covid-19 vaccination drive, India.

# Introduction
In these problematic times when Covid-19 is doing serious damage to people in India, the nationwide vaccination program started by the government is a ray of hope for people. However the massive population of India overshadows the limited number of vaccination centres. People are unable to book a slot for vaccination. The moment, they become aware of available slots, its already booked.

This is where CowinWatch comes to play. All you need to do is register on it with your age and district and it will start providing you hourly notifications regarding slots availability.

Sounds easy enough. Try it.

# Features
1. User registration with age and district.
2. User details can be updated anytime.
3. User can subscribe or unsubscribe to hourly notifications about slots availability.
4. User can check for slots on basis of a pin.

# Commands
| Commands      | Use |
| ----- | ----------------------------------------------- |
| *help  | To view all commands. Registration not required.  |
| *start  | To begin the registration process and private message between bot and user.<br>One time use command. Not required after registration.|
| *register `age` `district`  | To register a user with age and district.<br>For eg. *register 20 ernakulam<br>This registers a user in group of 18+ and in district Ernakulam.|
| *my_det	| To get details of registered user.<br>
REGISTRATION REQUIRED|
| *upd `<age>`  | To update a user's age (REGISTRATION REQUIRED)<br>For eg. *upd 45<br>This changes the age of user to 45|
| *upd `<district>`  | To update a user's district (REGISTRATION REQUIRED).<br>For eg. *upd Thrissur<br>This changes the district of user to Thrissur
| *pin `<pincode>`  | To get vaccination centres on basis of PINCODE (REGISTRATION NOT REQUIRED)<br>For eg. *pin 6820022<br>Gives the slots available in centres located in this PINCODE
| *slots		| To manually get the slots of the selected district (REGISTRATION REQUIRED)<br>User can give this command in the DM to get slots availability.
| *on	| To subscribe to hourly updates of available slots (REGISTRATION REQUIRED)|
| *off	| 	To unsubscribe from hourly updates of available slots (REGISTRATION REQUIRED)

# About Me
I am just a student trying to learn the technicalities of web development. Reach out to me if any doubt occurs. Cheers!!!

