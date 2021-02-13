const Discord = require('discord.js');

const {deleteVcChannel, getVcChannels} = require("../database/tempVcChannels")
const {VoiceStatus} = require('../enums');

/**
 * 
 * @param {Discord.Client} bot 
 */

async function event(bot){
    if(bot == undefined) return console.trace("No client specified")
    bot.on("voiceStateUpdate", async (oldState, newState)=>{

        if(oldState.channelID == null && newState.channelID != null) return
        /**
         * @type {Array}
         */
        let channels = await getVcChannels(oldState.guild.id)
        if(channels.some(item => item.channelId == oldState.channelID)){
            
            let c = oldState.channel;
            if(c.members.size != 0) return
            c.delete("empty channel")
            deleteVcChannel(c.id, c.guild.id)
        }
    })
}
module.exports = event