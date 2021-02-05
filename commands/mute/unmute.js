const Discordjs = require("discord.js")
const Commando = require("discord.js-commando")

const {getMuteRole} = require("../../database/settings.js")

class unmute extends Commando.Command{
    constructor(client){
        super(client,{
            name:"unmute",
            group: "mute",
            memberName: "unmute",
            description: "Unutes a user",
            args:[
             {
                key: "user",
                type:"member",
                prompt: "What user do you want to unmute?"
             }
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} message
     */
    async run(message, {user}){
        //let user = new Discordjs.GuildMember;
        let guild = message.guild;
        if(!guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Sorry, but I need `manage roles` permission")
        let mutedRole = await getMuteRole(guild.id)
        if(mutedRole == undefined) return message.reply(`This server doesn't have set mute role\ Use \`${process.env.token}setmuterole (@role)\``)
        if(!user.roles.cache.has(mutedRole.roleId)) return message.reply("This user isn't muted")
        user.roles.remove(mutedRole.roleId).catch(error =>{
            return message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}`)}
        )
        message.reply(`${user.displayName} has been unmuted`)
    }
}

module.exports = unmute