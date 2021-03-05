const { CommandoClient } = require('discord.js-commando');

const {getReactionRoles} = require("../../database/reactionRoles.js")

/** @param {CommandoClient} bot */
async function event(bot){
    if(bot == undefined) return console.trace("No client specified")
    bot.on("messageReactionAdd", async (reaction, user)=>{
        if(user.id == bot.user.id) return
        if(reaction.message.partial) await reaction.message.fetch()
        let reactionRoles = await getReactionRoles(reaction.message.id)
        if(!reactionRoles) return
        for(let role of reactionRoles){
            if(reaction.emoji.name == role.emoji){
                (await (await bot.guilds.fetch(role.guildId)).members.fetch(user.id)).roles.add(role.roleId)
            }
        }

    })
}
module.exports = event