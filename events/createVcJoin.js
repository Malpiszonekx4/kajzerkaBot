const Discord = require('discord.js');

const {getCreateVcChannelName, getCreateVcChannelId} = require("../database/createVc")
const {addVcChannel} = require("../database/tempVcChannels")

/**
 * 
 * @param {Discord.Client} bot 
 */

async function event(bot){
    if(bot == undefined) return console.trace("No client specified")
    bot.on("voiceStateUpdate", async (oldState, newState)=>{
        let createVcChannel = await getCreateVcChannelId(newState.guild.id)
        if(createVcChannel == undefined) return; // guild didn't setup channel
        if(newState.channelID != createVcChannel.channelId) return // wrong channel
        if(!newState.guild.me.hasPermission("MOVE_MEMBERS")) return // bot doesn't have required permissions
        if(!newState.guild.me.hasPermission("MANAGE_CHANNELS")) return // bot doesn't have required permissions
        let name = await getCreateVcChannelName(newState.guild.id)
        if(name == undefined) name = `🔈 ${newState.member.displayName}`
        name = name.replace("%usernick%", newState.member.displayName)
        let c = await newState.guild.channels.create(name, {type: "voice"})
        newState.member.voice.setChannel(c)
        addVcChannel(c.id, newState.guild.id)
    })
}
module.exports = event