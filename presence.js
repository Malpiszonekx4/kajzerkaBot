const presence = require('./presence.json');
const {getUsers} = require("./betterstats");
const { CommandoClient } = require('discord.js-commando');
let i = 0;
/**
 * @param {CommandoClient} client 
 */
module.exports = async (client)=>{
    let p = presence[i]
    //#region replaceVars
    p.activity.name = p.activity.name.replace("%guilds%", client.guilds.cache.size)
    p.activity.name = p.activity.name.replace("%users%", await getUsers(client))
    p.activity.name = p.activity.name.replace("%prefix%", process.env.prefix)
    p.activity.name = p.activity.name.replace("%botname%", client.user.username)

    //#endregion
    client.user.setPresence(presence[i])
    .catch(console.error)
    i++
    if(i == presence.length) i = 0
    setTimeout(module.exports, 60000, client)
}