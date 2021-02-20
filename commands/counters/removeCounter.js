const Commando = require("discord.js-commando")

const {removeCounter, getCounter} = require("../../database/counters.js")

class RemoveCounter extends Commando.Command{
    constructor(client){
        super(client,{
            name:"removecounter",
            aliases:["counterremove"],
            group: "counters",
            memberName: "removecounter",
            description: "remove counter",
            args: [
                {
                    key:"name",
                    type: "string",
                    prompt:"Name of counter to remove"
                }
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {name}){
        let cc = await getCounter(name)
        let c = await removeCounter(name)
        if(c == "404"){
            message.reply(`Counter \`${name}\` not found`)
        }
        else{
            message.reply(`Counter \`${cc.displayName}\`(\`${cc.internalName}\`) has been removed`)
        }
    }
}

module.exports = RemoveCounter