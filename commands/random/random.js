const Commando = require("discord.js-commando")

const categories = require('./categories.js');

class random extends Commando.Command{
    constructor(client){
        super(client,{
            name: "random",
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
                },
                {
                    key: "names",
                    type: "string",
                    default: '',
                    prompt: "qwert",
                    validate: (val)=>{
                        try{
                            return Array.isArray(JSON.parse(val))
                        } catch{
                            return false
                        }
                    },
                    parse: (val)=>{
                        return JSON.parse(val)
                    }
                }
            ],
            group: "random",
            memberName: "random",
            description: "Randomise something"
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     * @param {Object} args
     * @param {String} args.name
     * @param {Number} args.count
     * @param {String[]} args.name
     */
    async run(msg, {name, count, names}){
        if(name == "?"){
            let s = "Categories:\n";
            for(let cat in categories){
                s +=`\`${cat}\` (${cat.length} sub categories)`+"\n"
            }
            return msg.reply(s)
        }

        let result = [];
        let response = "";
        if(name.indexOf(".") == -1){
            if(categories[name] == undefined) return msg.reply(`\`${name}\` doesn't exist`)
            if(categories[name].length == undefined) return msg.reply(`\`${name}\` is a folder of collections\n try using \`${name}.all\``)
            result = categories[name]
        }
        else {
            let o = categories;
            let n = name.split(".")
            let cat = "";
            for(let sub of n){
                if(sub == "?"){
                    if(!isNaN(parseInt(Object.keys(o)[0]))) return msg.reply(`Values for \`${cat}\` category:${o.map((val)=>{
                        return ` ${val}`
                    })}`)
                    else return msg.reply(`Sub categories for \`${cat}\`:\n ${Object.keys(o).map((val)=>{
                        return ` ${val}`
                    })}`)
                }
                if(o[sub] != undefined){
                    o = o[sub]
                    if(cat.length == 0) cat += sub
                    else cat += "."+sub
                }
                else{
                    return msg.reply(`This category(\`${sub}\`) doesn't exist`)
                }
            }
            result = o;
        }
        for(let i = 0; i < count; i++){
            if(names) response += `${names[i]}. ${result[getRndInteger(0, result.length-1)]}\n`
            else response += `${i+1}. ${result[getRndInteger(0, result.length-1)]}\n`
        }
        msg.channel.send(response)
    }
}
function getRndInteger(min, max) {
    let r = Math.round(Math.random() * (max - min) + min)
    return r
}
module.exports = random