const Commando = require("discord.js-commando")

const disBut = require('discord-buttons');

const {getRandomInteger} = require('../../utils');

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
                s +=`\`${cat}\` (${Object.values(categories[cat]).length} sub categories)`+"\n"
            }
            return msg.reply(s)
        }

        let result = [];
        let response = "";
        if(name.indexOf(".") == -1){
            if(categories[name] == undefined) return msg.reply(`\`${name}\` doesn't exist`)
            if(categories[name].length == undefined) return msg.reply(`\`${name}\` is a folder of collections\n use \`${name}.?\` to view aviable options`)
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
            if(names) response += `${names[i]}. ${result[getRandomInteger(0, result.length-1)]}\n`
            else response += `${i+1}. ${result[getRandomInteger(0, result.length-1)]}\n`
        }

        let btn = new disBut.MessageButton()
            .setStyle('blurple')
            .setLabel("Reroll")
            .setID(JSON.stringify({name, count, names}))

        msg.channel.send(response, btn)
    }
}

module.exports = random