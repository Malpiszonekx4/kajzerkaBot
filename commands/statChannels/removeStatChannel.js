const Commando = require("discord.js-commando")

const {removeStatChannel} = require("../../database/stat-channels.js")

class SetStatChannel extends Commando.Command{
    /**
     * @param {Commando.CommandoClient} client 
     */
    constructor(client){
        super(client,{
            name:"removestatchannel",
            group: "statchannels",
            memberName: "removestatchannel",
            description: "Remove channel from stats channels",
            args:[
                {
                    key: "channel",
                    prompt: "Voice channel you want to remove",
                    type: 'voice-channel'
                }
            ]
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {channel}){
        removeStatChannel(msg.guild.id, channel.id )
    }
}

module.exports = SetStatChannel