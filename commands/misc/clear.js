const { Message, Channel, TextChannel } = require("discord.js");
const Commando = require("discord.js-commando")

class Clear extends Commando.Command{
    constructor(client){
        super(client,{
            name:"clear",
            group: "misc",
            memberName: "clear",
            description: "delete messages",
            args:[
                {
                    key: "count",
                    prompt: "How many messages do you want to delete?",
                    type: 'integer'
                },
                {
                    key:"force",
                    prompt: "prompt",
                    type: 'boolean',
                    default: false
                }
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {count, force}){
        
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't delete messages, need Manage Messages permission")
        /** @type {TextChannel} */
        let channel = message.channel;
        let messages = await channel.messages.fetch({limit: count})
        let toDelete = []
        let cantDelete = []
        messages.each((msg)=>{
            let today = new Date()
            let twoWeeksLater = today;
            twoWeeksLater.setDate(today.getDate() - 14)
            if(msg.createdAt >= twoWeeksLater) toDelete.push(msg)
            else cantDelete.push(msg)
        })

        channel.bulkDelete(toDelete)
        if(force){
            cantDelete.forEach((m)=>{
                m.delete()
            })
        }
        else if(cantDelete.length != 0) message.reply(`I can't delete ${cantDelete.length} messages because they are 2 weeks old`)
    }
}

module.exports = Clear