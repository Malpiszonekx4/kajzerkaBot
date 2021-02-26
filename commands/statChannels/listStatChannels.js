const { VoiceChannel } = require("discord.js")
const Commando = require("discord.js-commando")

const {getGuildChannels} = require("../../database/stat-channels.js")

class ListStatChannels extends Commando.Command{
    /**
     * @param {Commando.CommandoClient} client 
     */
    constructor(client){
        super(client,{
            name:"liststatchannels",
            group: "statchannels",
            memberName: "liststatchannels",
            description: "List all stat channels in guild"
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg){
        let channels = await getGuildChannels(msg.guild.id)
        if(channels.length == 0) return msg.reply(`No stat channels in this guild. \n You can add some with \`${process.env.prefix}setstatchannel (channel id) (channel text)\``)
        let res = ""

        for(let c of channels){
            /** @type {VoiceChannel} */
            let cCh = this.client.channels.cache.get(c.channelId)

            res += `Channel \`${cCh.name}\` with text = \`${c.text}\`\n`
        }
        msg.channel.send(res)
    }
}

module.exports = ListStatChannels