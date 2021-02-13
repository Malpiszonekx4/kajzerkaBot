const Commando = require("discord.js-commando")

const {setCreateVcChannelName} = require("../../database/createVc.js")

class SetCreateVcChannelId extends Commando.Command{
    constructor(client){
        super(client,{
            name:"createvcname",
            group: "settings",
            memberName: "createvcname",
            description: "Set default name of created channel\nVariables:\n%usernick% - user display name",
            args:[
                {
                    key: "name",
                    prompt: "name you want to set\nVariables:\n%usernick% - user display name",
                    type: 'string'
                }
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {name}){
        setCreateVcChannelName(name, msg.guild.id)
    }
}

module.exports = SetCreateVcChannelId