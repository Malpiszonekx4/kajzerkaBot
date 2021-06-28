require('dotenv').config();
const fs = require('fs');

const Commando = require('discord.js-commando');
const client = new Commando.Client({owner: process.env.ownerId,commandPrefix: process.env.prefix, partials: ['MESSAGE', 'CHANNEL', 'REACTION']})
require('discord-buttons')(client);

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
            ["statchannels", "Stat channels commands"],
            ["reactionroles", "Commands for setting up reaction roles"]
        ])
        .registerDefaultTypes()
        .registerDefaultGroups()
        .registerDefaultCommands({
            unknownCommand: false
        })
        .registerCommandsIn(__dirname+"/commands");
    loadEvents(__dirname+"/events/")
    schedule()
    require('./presence.js')(client);
});

client.login(process.env.token);
/**
 * @type {Map<string, Function>}
 */
let events = new Map()

function loadEvents(dir){
    let files = fs.readdirSync(dir)
    for(let file of files){
        if(fs.statSync(dir+"/"+file).isDirectory()) loadEvents(dir+"/"+file)
        else {
            let v = require(dir+"/"+file)
            if(file.endsWith(".js")) events.set(file,v)
            v(client)
        }
    }
}
/**
 * @type {Map<string, NodeJS.Timeout>}
 */
let schedules = new Map()
function schedule(){
    let files = fs.readdirSync(__dirname+"/schedules")
    files.forEach((val)=>{
        let v = require(__dirname+"/schedules/"+val)
        if(val.endsWith(".js")) schedules.set(val, v(client))
    })
}
exports.schedules = schedules
exports.events = events

require("./site");