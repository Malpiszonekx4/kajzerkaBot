const Commando = require("discord.js-commando")

const {removeReactionRole, getReactionRole} = require('../../database/reactionRoles.js');

class SetReactionRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"removereactionrole",
            args: [
                {
                    key:"message",
                    type: "message",
                    prompt:"Message to remove reactions"
                },
                {
                    key:"emoji",
                    type: "default-emoji|custom-emoji",
                    prompt:"emoji to remove"
                }
            ],
            group: "reactionroles",
            memberName: "removereactionrole",
            description: "remove reaction role"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {message, emoji}){
        let r = await getReactionRole(message.id, emoji)
        removeReactionRole(message.id, emoji)
        msg.reply(`Removed ${r.emoji} for role <@&${r.roleId}>`)
    }
}
module.exports = SetReactionRole