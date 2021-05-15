const { CommandoClient } = require('discord.js-commando');

const {getOnJoinSettings} = require('../database/onMemberJoining');

/**
 * @param {CommandoClient} bot 
 */

module.exports = (bot) =>{
    bot.on("guildMemberAdd", async (member)=>{
        let ojs = await getOnJoinSettings()
        if(ojs) member.roles.add(member.guild.roles.fetch(ojs.roleId))
    })
}