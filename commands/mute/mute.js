const Discordjs = require("discord.js")
const Commando = require("discord.js-commando")

const {getMuteSettings} = require("../../database/settings.js")

class mute extends Commando.Command{
    constructor(client){
        super(client,{
            name:"mute",
            group: "mute",
            memberName: "mute",
            description: "Mutes a user",
            args:[
             {
                key: "user",
                type:"member",
                prompt: "What user do you want to mute?"
             }
            ]
        })
    }
    /**
     * @param {Commando.CommandoMessage} message
     * @param {Object} args
     * @param {Discordjs.GuildMember} args.user
     */
    async run(message, {user}){
        let guild = message.guild;
        if(!guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Sorry, but I need `manage roles` permission")
        let muteSettings = await getMuteSettings(guild.id)
        if(muteSettings == undefined) return message.reply(`This server doesn't have set mute role\ Use \`${process.env.token}setmuterole (@role)\``)
        if(user.roles.cache.has(muteSettings.muteRoleId)) return message.reply("This user is already muted")
        user.roles.add(muteSettings.muteRoleId).catch(error =>{
            return message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)}
        )
        message.reply(`${user.displayName} has been muted`)
        //#region replace vars
        let m = muteSettings.muteMsg.replace("%@muter%", message.member.toString())
        //#endregion
        if(m) user.send(m)
    }
}

module.exports = mute