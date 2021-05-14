const Discord = require("discord.js");
const Commando = require("discord.js-commando")

const Duration = require('parse-duration').default;

const {addVcBan, getVcBan} = require('../../database/vcbans');
const {getVcBannedRole} = require('../../database/vcbaning');

class Clear extends Commando.Command{
    constructor(client){
        super(client,{
            name:"vcban",
            group: "misc",
            memberName: "vcban",
            description: "Ban member from joining vc",
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
                    prompt: "time of ban",
                    type: "string",
                    validate: (val)=>{
                        let duration = Duration(val)
                        if(duration == null) return false;
                        return !isNaN(Duration(val))
                    }/* ,
                    parse: (val)=>{
                        return Date.now() + Duration(val)
                    } */
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
        const parse = (string) => Date.now() + Duration(string)
        let ban = await getVcBan(member.guild.id, member.id)
        if(ban) return msg.reply('User already vc banned')
        let br = await getVcBannedRole(member.guild.id)
        let role = await msg.guild.roles.fetch(br.roleId)
        addVcBan(member.guild.id, member.user.id, parse(time), reason)
        member.roles.add(role)
        msg.reply(`successfully vc banned ${member} for \`${reason}\` for ${time}`)
        
    }
}

module.exports = Clear