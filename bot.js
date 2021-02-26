require('dotenv').config();
const fs = require('fs');

const Commando = require('discord.js-commando');
const client = new Commando.Client({owner: process.env.ownerId,commandPrefix: process.env.prefix})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.registry
        .registerGroups([
            ["counters","Counters commands"],
            ["random", "command to randomising things"],
            ["mute", "Muting commands"],
            ["settings", "settings"],
            ["misc", "miscellaneous"],
            ["kick", "kicking commands"],
            ["statchannels", "Stat channels commands"]
        ])
        .registerDefaultTypes()
        .registerDefaultGroups()
        .registerDefaultCommands({
            unknownCommand: false
        })
        .registerCommandsIn(__dirname+"/commands");
    loadEvents()
    schedule()
    require('./presence.js')(client);
});

client.login(process.env.token);

let events = []

function loadEvents(){
    let files = fs.readdirSync(__dirname+"/events")
    files.forEach((val)=>{
        let v = require(__dirname+"/events/"+val)
        if(val.endsWith(".js")) events.push(v)
        v(client)
    })
}

let schedules = []
function schedule(){
    let files = fs.readdirSync(__dirname+"/schedules")
    files.forEach((val)=>{
        let v = require(__dirname+"/schedules/"+val)
        if(val.endsWith(".js")) events.push(v)
        v(client)
    })
}

require("./site");