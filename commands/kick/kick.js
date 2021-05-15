const { GuildMember } = require("discord.js");
const Commando = require("discord.js-commando")

class Kick extends Commando.Command{
    constructor(client){
        super(client,{
            name:"kick",
            args: [
                {
                    key: "user",
                    prompt: "User you want to kick",
                    type: "member"
                }
            ],
            group: "kick",
            memberName: "kick",
            description: "kick user from server",
            clientPermissions:[
                "KICK_MEMBERS"
            ],
            userPermissions: [
                "KICK_MEMBERS"
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg
     */
    async run(msg, {user}){
        /**
         * @type {GuildMember}
         */
        //let user = usera;
        user.kick(`Kicked by ${msg.author.username}#${msg.author.discriminator}`)
        msg.reply(`User <@${user.id}> has been kicked`)
    }
}
module.exports = Kick