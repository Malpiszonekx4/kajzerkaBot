const Discordjs = require("discord.js")
const Commando = require("discord.js-commando")

const {getMuteSettings} = require("../../database/muting.js")
const {removeMuteByUserId} = require("../../database/mutes.js")

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
            ],
            userPermissions: [
                "MUTE_MEMBERS"
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
        if(!user.roles.cache.has(muteSettings.muteRoleId)) return message.reply("This user isn't muted")
        user.roles.remove(muteSettings.muteRoleId).catch(error =>{
            return message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}`)}
        )
        message.reply(`${user.displayName} has been unmuted`)

        //#region replace vars
        let m = muteSettings.unmuteMsg
        //#endregion
        if(m) user.send(m.replace("%@unmuter%", message.member.toString()))
        removeMuteByUserId(user.id)
    }
}

module.exports = unmute