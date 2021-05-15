const Commando = require("discord.js-commando")

const {setCreateVcChannelId} = require("../../database/createVc.js")

class SetCreateVcChannelId extends Commando.Command{
    constructor(client){
        super(client,{
            name:"createvcid",
            group: "settings",
            memberName: "createvcid",
            description: "Set channel to create VC",
            args:[
                {
                    key: "channel",
                    prompt: "Id of channel you want to set to",
                    type: 'voice-channel'
                }
            ],
            userPermissions: [
                "MANAGE_CHANNELS"
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {channel}){
        setCreateVcChannelId(channel.id,message.guild.id)
    }
}

module.exports = SetCreateVcChannelId