const Commando = require("discord.js-commando")

const {setMuteMsg} = require("../../database/settings.js")

class SetMuteMsg extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setmutemessage",
            group: "settings",
            memberName: "set muted message",
            description: "set message that is send to user on mute, \nfor none type `---` (default in none)",
            args:[
                {
                    key: "message",
                    prompt: "What message do you want to send on user mute \nfor none type `---`",
                    type: 'string'
                }
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
        msg.reply(`On mute message set to \`${message}\``)
        setMuteMsg(msg.guild.id, message)
    }
}

module.exports = SetMuteMsg