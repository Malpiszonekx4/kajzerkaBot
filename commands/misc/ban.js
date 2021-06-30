const Discord = require("discord.js");
const Commando = require("discord.js-commando")

const {randomGif} = require('../../tenor');
const { getRandomInteger } = require("../../utils");

let gifSearchTerms = ["ban", "banned", "banhammer"]

class Clear extends Commando.Command{
    constructor(client){
        super(client,{
            name:"ban",
            group: "misc",
            memberName: "ban",
            description: "Ban member",
            args:[
                {
                    key: "member",
                    prompt: "User you want to ban",
                    type: 'member'
                },
                {
                    key: "reason",
                    prompt: "Reason of ban",
                    type: 'string',
                },
                {
                    key: "time",
                    prompt: "days of ban",
                    type: "integer"
                }
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ["BAN_MEMBERS"]
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     * @param {Object} args
     * @param {Discord.GuildMember} args.member
     */
    async run(msg, {member, reason, time}){
        //if(!member.bannable) return msg.reply(" I can't ban this user")
        //member.ban({reason: reason, days: time})

        let gif = await randomGif(gifSearchTerms[getRandomInteger(0, gifSearchTerms.length-1)])
        let embed = new Discord.MessageEmbed()
                    .setDescription(`successfully banned ${member} for \`${reason}\` for ${time} days`)
                    .setImage(gif.gifUrl)
                    .setFooter("Powered by Tenor") // required attribution
                    .setColor("#7289DA") //blurple

        msg.reply(embed)
        
    }
}

module.exports = Clear