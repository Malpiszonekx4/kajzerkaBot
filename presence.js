const {Client} = require('discord.js');
const presence = require('./presence.json');
const {getUsers} = require("./betterstats")
let i = 0;
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client)=>{
    let p = presence[i]
    //#region replaceVars
    p.activity.name = p.activity.name.replace("%guilds%", client.guilds.cache.size)
    p.activity.name = p.activity.name.replace("%users%", await getUsers(client))
    //#endregion
    client.user.setPresence(presence[i])
    .catch(console.error)
    i++
    if(i == presence.length) i = 0
    setTimeout(module.exports, 60000, client)
}