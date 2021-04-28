const Commando = require("discord.js-commando")

const {setStatChannelText} = require("../../database/stat-channels.js")

class SetStatChannel extends Commando.Command{
    /**
     * 
     * @param {Commando.CommandoClient} client 
     */
    constructor(client){
        super(client,{
            name:"setstatchannel",
            group: "statchannels",
            memberName: "setstatchannel",
            description: "Set stat channel text",
            args:[
                {
                    key: "channel",
                    prompt: "Voice channel you want to set",
                    type: 'voice-channel'
                },
                {
                    key: "name",
                    prompt: "Name you want to set\n _variables_:\n %usercount% - count of users(without bots)\n %botcount% - count of bots",
                    type: 'string'
                }
            ],
            userPermissions:[
                "MANAGE_CHANNELS"
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {channel, name}){
        setStatChannelText(msg.guild.id,channel.id, name )
    }
}

module.exports = SetStatChannel