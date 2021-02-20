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
                    type: 'string',
                    validate: (val, msg, arg)=>{
                        return !isNaN(val)
                    }
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
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {count, force}){
        if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.reply("I can't delete messages, need Manage Messages permission")
        let m = await msg.channel.messages.fetch(count)
        if(m.content != undefined){
            let c = []
            let messages = await (await msg.channel.messages.fetch()).array()
            for(let fm of messages){
                if(fm.id != m.id) c.push(fm)
                else break
            }
            c.push(m)
            msg.channel.bulkDelete(c)
        }
        else{
            if(count >= 100000000000000000) return msg.reply("Message not found")
            if(count >= 100) return msg.reply("Count can't be bigger than 100")
            /** @type {TextChannel} */
            let channel = msg.channel;
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
            else if(cantDelete.length != 0) msg.reply(`I can't delete ${cantDelete.length} messages because they are 2 weeks old`)
        }
    }
}

module.exports = Clear