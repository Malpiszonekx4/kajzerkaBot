const Discord = require("discord.js");
const Commando = require("discord.js-commando")

class Clear extends Commando.Command{
    constructor(client){
        super(client,{
            name:"ban",
            group: "misc",
            memberName: "ban",
            description: "Ban member",
            args:[
                {
                    key: "member",
                    prompt: "User you want to ban",
                    type: 'member'
                },
                {
                    key: "reason",
                    prompt: "Reason of ban",
                    type: 'string',
                },
                {
                    key: "time",
                    prompt: "days of ban",
                    type: "integer"
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
        if(!member.bannable) return msg.reply(" I can't ban this user")
        member.ban({reason: reason, days: time})

        msg.reply(`successfully banned ${member} for \`${reason}\` for ${time} days`)
        
    }
}

module.exports = Clear