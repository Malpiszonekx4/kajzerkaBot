const { CommandoClient } = require("discord.js-commando")

const {getMutes, removeMuteById} = require("../database/mutes")
const {getMuteSettings} = require('../database/muting');

/**
 * @param {CommandoClient} bot 
 */
async function schedule(bot){
    setTimeout(()=>{schedule(bot)},1000 * 1)
    if(bot == undefined) return console.trace("No client specified")
    getMutes().then((val)=>{
        val.forEach((m)=>{
            if(m.duration < Date.now())
                removeMuteById(m._id)
                bot.guilds.fetch(m.guildId).then((g)=>{
                    g.members.fetch(m.userId).then(async (usr)=>{
                        let s = await getMuteSettings();
                        usr.roles.remove(g.roles.fetch(s.muteRoleId))
                        usr.send(s.unmuteMsg.replace("%@unmuter%", "auto"))
                    })
                })
        })
    })
}
module.exports = schedule