const Commando = require("discord.js-commando")

const {createCounter} = require("../../nedb")

class addCounter extends Commando.Command{
    constructor(client){
        super(client,{
            name:"addcounter",
            aliases:["addcounter", "counteradd"],
            args: [
                {
                    key:"name",
                    type: "string",
                    prompt:"display name of counter?"
                },
                {
                    key:"id",
                    type: "string",
                    prompt:"internal name of counter (used in commands)"
                }
            ],
            group: "counters",
            memberName: "addcounter",
            description: "add a counter to count"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message 
     */
    async run(message, {name, id}){
        let cc = await createCounter(name, id)
        if(cc == "exists"){
            message.reply(`Counter \`${id}\` already exists`)
        }
        else{
            message.reply("Counter succesfully created")
        }
    }
}

module.exports = addCounter