const {getGuildChannels} = require("../database/stat-channels.js")
const { CommandoClient } = require("discord.js-commando")

const {getUserCountInGuild, getBotCountInGuild} = require("../betterstats")

/**
 * @param {CommandoClient} bot 
 */
async function schedule(bot){
    setTimeout(()=>{schedule(bot)},1000 * 60 * 5)
    if(bot == undefined) return console.trace("No client specified")
    let guilds = await bot.guilds.cache.array()
    for(let guild of guilds){
        let channelss = await getGuildChannels(guild.id)
        /**
         * @type {Discord.VoiceChannel[]}
         */
        let channels = channelss.map((v)=>{return bot.channels.resolve(v.channelId)})
        let i = 0;
        for(let ch of channels){
            let name = channelss[i].text.replace("%usercount%", await getUserCountInGuild(bot, guild.id))
            name = name.replace("%botcount%", await getBotCountInGuild(bot, guild.id))
            ch.setName(name, "stat update")
            i++;
        }
    }
}
module.exports = schedule