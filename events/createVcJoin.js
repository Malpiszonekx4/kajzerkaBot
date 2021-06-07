const { CommandoClient } = require('discord.js-commando');

const {getCreateVcChannelName, getCreateVcChannelId, getCreateVcChannelCategory, getCreatedVcChannelEditPerms} = require("../database/createVc")
const {addVcChannel} = require("../database/tempVcChannels")

/** @param {CommandoClient} bot */
async function event(bot){
    if(bot == undefined) return console.trace("No client specified")
    bot.on("voiceStateUpdate", async (oldState, newState)=>{
        let createVcChannelId = await getCreateVcChannelId(newState.guild.id)
        if(createVcChannelId == undefined) return; // guild didn't setup channel
        if(newState.channelID != createVcChannelId) return // wrong channel
        if(!newState.guild.me.hasPermission("MOVE_MEMBERS")) return // bot doesn't have required permissions
        if(!newState.guild.me.hasPermission("MANAGE_CHANNELS")) return // bot doesn't have required permissions
        let name = await getCreateVcChannelName(newState.guild.id)
        if(name == undefined) name = `🔈 ${newState.member.displayName}`
        else name = name.replace("%usernick%", newState.member.displayName)
        let parent = await getCreateVcChannelCategory(newState.guild.id)
        let c = await newState.guild.channels.create(name, {type: "voice", parent: parent ? parent.id : undefined})
        newState.member.voice.setChannel(c)
        addVcChannel(c.id, newState.guild.id)
        let canedit = await getCreatedVcChannelEditPerms(newState.guild.id)
        if(canedit) c.overwritePermissions([{id: newState.member.id, allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES']}])
    })
}
module.exports = event