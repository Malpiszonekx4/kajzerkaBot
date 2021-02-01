const Commando = require("discord.js-commando")

const categories = require('./categories.js');

class random extends Commando.Command{
    constructor(client){
        super(client,{
            name:"random",
            args: [
                {
                    key:"name",
                    type: "string",
                    prompt:"Which category you want to randomise"
                },
                {
                    key:"count",
                    type: "integer",
                    prompt:"how many"
                }
            ],
            group: "random",
            memberName: "random",
            description: "Randomise something"
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {name, count}){
        let result = [];
        let response = "";
        if(name.indexOf(".") == -1){
            if(categories[name] == undefined) return msg.reply(`${name} doesn't exist`)
            if(categories[name].length == undefined) return msg.reply(`${name} is a folder of collections\n try using ${name}.all`)
            result.push(categories[name])
        } 
        else {
            let o = categories;
            let n = name.split(".")
            if(o[n[0]] == undefined) return msg.reply("This category doesn't exist")
            for(let i = 0; i <=n.length; i++){
                o = o[n.shift()]
            }
            result = o;
        }
        for(let i = 0; i < count; i++){
            response += `${i+1}. ${result[getRndInteger(0, result.length)]}\n`
        }

        
        msg.channel.send(response)
    }
}
function getRndInteger(min, max) {
    let r = Math.round( Math.random() * (max - min) + min )
    return r
}
module.exports = random