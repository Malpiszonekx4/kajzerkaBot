const Commando = require("discord.js-commando")

const {setUnmuteMsg} = require("../../database/muting.js")

class SetMuteMsg extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setunmutemessage",
            group: "settings",
            memberName: "set unmuted message",
            description: "set message that is send to user on unmute, \nfor none type `---` (default in none)",
            args:[
                {
                    key: "message",
                    prompt: "What message do you want to send on user unmute \nfor none type `---`",
                    type: 'string'
                }
            ],
            userPermissions: [
                "MANAGE_ROLES"
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     * @param {Object} args
     * @param {String} args.message 
     */
    async run(msg, {message}){
        if(message == "---") message = ""
        msg.reply(`On unmute message set to \`${message}\``)
        setUnmuteMsg(msg.guild.id, message)
    }
}

module.exports = SetMuteMsg