const Commando = require('discord.js-commando');
const client = new Commando.Client({owner: process.env.ownerId,commandPrefix: "!"})

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.registry
        .registerGroups([
            ["counters","Counters commands"],
            ["random", "command to randomising things"]
        ])
        .registerDefaults({
            unknownCommand: false
        })
        .registerCommandsIn(__dirname+"/commands");
});

client.login(process.env.token);

require("./site");