const Discordjs = require("discord.js")
const Commando = require("discord.js-commando")

const Duration = require('parse-duration').default;

const {getMuteSettings} = require("../../database/muting.js")
const {setMute} = require("../../database/mutes.js")

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
             },
             {
                key: "time",
                type: "string",
                prompt: "Mute time",
                validate: (val)=>{
                    console.log(val)
                    console.log(Duration(val))
                    console.log(isNaN(Duration(val)));
                    let duration = Duration(val)
                    if(duration == null) return false;
                    return !isNaN(Duration(val))
                },
                parse: (val)=>{
                    return Date.now() + Duration(val)
                }
             }
            ],
            userPermissions: [
                "MANAGE_ROLES"
            ],
            clientPermissions: [
                "MUTE_MEMBERS"
            ]
        })
    }
    /**
     * @param {Commando.CommandoMessage} message
     * @param {Object} args
     * @param {Discordjs.GuildMember} args.user
     */
    async run(message, {user, time}){
        let guild = message.guild;
        if(!guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Sorry, but I need `manage roles` permission")
        let muteSettings = await getMuteSettings(guild.id)
        if(muteSettings == undefined) return message.reply(`This server doesn't have set mute role\ Use \`${process.env.prefix}setmuterole (@role)\``)
        if(user.roles.cache.has(muteSettings.muteRoleId)) return message.reply("This user is already muted")
        user.roles.add(muteSettings.muteRoleId).catch(error =>{
            return message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)}
        )
        message.reply(`${user.displayName} has been muted`)
        //#region replace vars
        let m = muteSettings.muteMsg
        //#endregion
        if(m) user.send(m.replace("%@muter%", message.member.toString()))
        setMute(user.id, message.guild.id, time)
    }
}

module.exports = mute