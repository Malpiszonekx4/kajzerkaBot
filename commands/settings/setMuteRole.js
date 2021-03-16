const Commando = require("discord.js-commando")

const {setMuteRole} = require("../../database/muting.js")

class SetMuteRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setmuterole",
            group: "settings",
            memberName: "set muted role",
            description: "set muted role witch is given when user is muted",
            args:[
                {
                    key: "role",
                    prompt: "What role do you want to set as mute role",
                    type: 'role'
                }
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {role}){
        setMuteRole(message.guild.id, role.id)
    }
}

module.exports = SetMuteRole