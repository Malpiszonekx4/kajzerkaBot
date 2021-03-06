const Commando = require("discord.js-commando")

const {countCounter} = require("../../database/counters")

class Count extends Commando.Command{
    constructor(client){
        super(client,{
            name:"count",
            args: [
                {
                    key:"name",
                    type: "string",
                    prompt:"Name of counter"
                }
            ],
            group: "counters",
            memberName: "count",
            description: "count the counter"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {name}){
        let cc = await countCounter(name)
        if(cc == "404"){
            message.reply("Counter with this name doesn't exist")
        }
        else if(cc == "too fast"){
            message.reply("Someone counted this counter recently")
        }
        else{
            message.reply(`Counter \`${cc.internalName}\` is now \`${cc.count}\``)
        }
    }
}

module.exports = Count