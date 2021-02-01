const Commando = require("discord.js-commando")

const {getCounters} = require("../../db")

class listCounters extends Commando.Command{
    constructor(client){
        super(client,{
            name:"listcounters",
            aliases:["counters", "counterslist"],
            group: "counters",
            memberName: "listcounters",
            description: "view list of counters"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {name}){
        let c = await getCounters()
        if(c == "no counters"){
            message.reply("No counter created 😢\n Create one with `!addcounter (name)`")
        }
        else{
            let s = ""
            for(let cc of c){
                s +=`${cc.name}(\`${cc.id}\`) = ${cc.count}\n`
            }
            message.reply("Counters:\n"+s)
        }
    }
}

module.exports = listCounters