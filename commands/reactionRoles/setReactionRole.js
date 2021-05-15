const Commando = require("discord.js-commando")

const {setReactionRole} = require('../../database/reactionRoles.js');

class SetReactionRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setreactionrole",
            args: [
                {
                    key:"message",
                    type: "message",
                    prompt:"Message to set reactions"
                },
                {
                    key:"role",
                    type: "role",
                    prompt:"role you want to give"
                },
                {
                    key:"emoji",
                    type: "default-emoji|custom-emoji",
                    prompt:"emoji to react"
                }
            ],
            group: "reactionroles",
            memberName: "setreactionrole",
            description: "set emoji to react to gain role",
            userPermissions: [
                "MANAGE_ROLES"
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {message, role, emoji}){
        let a = await setReactionRole(message.id, message.guild.id, message.channel.id, role.id, emoji.name ? emoji.name : emoji)
        msg.reply(`Set ${emoji} for role ${role}`)
        message.react(emoji)
    }
}
module.exports = SetReactionRole