const Commando = require("discord.js-commando")

const {setMuteRole} = require("../../database/muting.js")

class SetMuteRole extends Commando.Command{
    constructor(client){
        super(client,{
            name:"setvcbanrole",
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
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {role}){
        message.react('WIP')
    }
}

module.exports = SetMuteRole