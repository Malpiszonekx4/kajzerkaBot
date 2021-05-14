const Discord = require("discord.js");
const Commando = require("discord.js-commando")

const {removeVcBan, getVcBan} = require('../../database/vcbans');
const {getVcBaningSettings} = require('../../database/vcbaning');

class Clear extends Commando.Command{
    constructor(client){
        super(client,{
            name:"unvcban",
            group: "misc",
            memberName: "unvcban",
            description: "unban member from joining vc",
            args:[
                {
                    key: "member",
                    prompt: "User you want to unban",
                    type: 'member'
                }
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ["BAN_MEMBERS"]
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     * @param {Object} args
     * @param {Discord.GuildMember} args.member
     */
    async run(msg, {member, reason, time}){
        let ban = await getVcBan(member.guild.id, member.id)
        if(!ban) return msg.reply('User not vc banned')
        let br = await getVcBaningSettings(member.guild.id)
        let role = await msg.guild.roles.fetch(br.roleId)
        removeVcBan(member.guild.id, member.user.id)
        member.roles.remove(role)
        msg.reply(`successfully vc unbanned ${member}`)
        
    }
}

module.exports = Clear