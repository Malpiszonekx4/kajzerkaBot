const { CommandoClient } = require("discord.js-commando")

const {getVcBans, removeVcBan} = require("../database/vcbans")
const {getVcBaningSettings} = require('../database/vcbaning');

/**
 * @param {CommandoClient} bot 
 */
async function schedule(bot){
    setTimeout(()=>{schedule(bot)},1000 * 1)
    if(bot == undefined) return console.trace("No client specified")
    getVcBans().then((bans)=>{
        bans.forEach((ban)=>{
            if(ban.duration < Date.now())
                removeVcBan(ban._id)
                bot.guilds.fetch(ban.guildId).then((g)=>{
                    g.members.fetch(ban.userId).then(async (usr)=>{
                        let s = await getVcBaningSettings();
                        usr.roles.remove(g.roles.fetch(s.roleId))
                        usr.send(s.unBanMsg.replace("%@unmuter%", "auto"))
                    })
                })
        })
    })
}
module.exports = schedule