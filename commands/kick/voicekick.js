const { GuildMember } = require("discord.js");
const Commando = require("discord.js-commando")

class VoiceKick extends Commando.Command{
    constructor(client){
        super(client,{
            name:"voicekick",
            args: [
                {
                    key: "user",
                    prompt: "User you want to kick",
                    type: "member"
                }
            ],
            aliases: [
                "vckick",
                "vkick"
            ],
            group: "kick",
            memberName: "voicekick",
            description: "kick user from voice chat",
            clientPermissions:[
                "MOVE_MEMBERS"
            ],
            userPermissions: [
                "MOVE_MEMBERS"
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
        user.voice.kick(`Kicked by ${msg.author.username}#${msg.author.discriminator}`)
        msg.reply(`User <@${user.id}> has been kicked`)
    }
}
module.exports = VoiceKick