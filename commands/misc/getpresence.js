const Discord = require("discord.js");
const Commando = require("discord.js-commando")

class Cmd extends Commando.Command{
    constructor(client){
        super(client,{
            name:"getpresence",
            group: "misc",
            memberName: "getpresence",
            description: "get presence data of user",
            args:[
                {
                    key: "member",
                    prompt: "user",
                    type: "member"
                }
            ]
        })
    }
    /**
     * @param {Discord.Message} msg 
     * @param {Object} args
     * @param {Discord.GuildMember} args.member
     */
    async run(msg, {member}){
        let res = new Discord.MessageEmbed()
        .setColor("#7289DA")

        if(member.user) res.setAuthor(`${member.displayName}${member.displayName.endsWith('s') ? "'" : "'s"} presence`, member.user.avatarURL())

        for(let acti of member.presence.activities){
            res.addField(acti.name, `Details: ${acti.details} \n
            State: ${acti.state} \n
            Started: ${acti.timestamps.start.toUTCString()}`)
        }
        msg.channel.send(res)
    }
}

module.exports = Cmd