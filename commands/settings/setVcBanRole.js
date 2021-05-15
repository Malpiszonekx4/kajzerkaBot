const { Role } = require("discord.js")
const Commando = require("discord.js-commando")

const {setVcBannedRole} = require("../../database/vcbaning")

class SetMuteRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setvcbanrole",
            aliases: ["setvcbannedrole"],
            group: "settings",
            memberName: "set vc banned role",
            description: "set vc banned role witch is given when user is vc banned",
            args:[
                {
                    key: "role",
                    prompt: "What role do you want to set as vc banned role",
                    type: 'role'
                }
            ]
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     * @param {object} args
     * @param {Role} args.role
     */
    async run(msg, {role}){
        if(!msg.member.manageable) return msg.reply("I can't do anything to you")
        if(role.position > msg.guild.me.roles.highest.position) return msg.reply(`Role ${role.name} is higher than my highest role`)
        msg.member.roles.add(role)
        msg.react('✅')
        //setVcBannedRole(message.guild.id, role.id)
    }
}

module.exports = SetMuteRole