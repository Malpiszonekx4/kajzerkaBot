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
        if(newState.channelID != createVcChannel.channelId) return
        if(!newState.guild.me.hasPermission("MOVE_MEMBERS")) return
        if(!newState.guild.me.hasPermission("MANAGE_CHANNELS")) return
        let name = await getCreateVcChannelName(newState.guild.id)
        if(name == undefined) name = `🔈 ${newState.member.displayName}`
        name = name.replace("%usernick%", newState.member.displayName)
        let c = await newState.guild.channels.create(name, {type: "voice"})
        newState.member.voice.setChannel(c)
        addVcChannel(c.id, newState.guild.id)
    })
}
module.exports = event