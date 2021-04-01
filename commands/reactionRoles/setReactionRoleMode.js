const Commando = require("discord.js-commando")

const {setMode, getReactionRoles} = require('../../database/reactionRoles.js');

class SetReactionRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"reactionrolemode",
            args: [
                {
                    key:"message",
                    type: "message",
                    prompt:"Message to set mode"
                },
                {
                    key:"mode",
                    type: "string",
                    prompt:"Mode to set:\n `single` or `multi`",
                    validate: (val)=>{
                        if(val == "single" || val == "multi") return true
                        else return false
                    }
                }
            ],
            group: "reactionroles",
            memberName: "reactionrolemode",
            description: "change reaction role mode"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {message, mode}){
        let rr = await getReactionRoles(message.id)
        if(!rr) return msg.reply('This message doesn\'t have any reaction roles')
        setMode(mode, message.id)
        msg.reply('Success')
    }
}
module.exports = SetReactionRole