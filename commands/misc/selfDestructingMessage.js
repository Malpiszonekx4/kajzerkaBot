const Discord = require("discord.js");
const Commando = require("discord.js-commando")

const Duration = require('parse-duration').default;

class Cmd extends Commando.Command{
    constructor(client){
        super(client,{
            name:"selfdestructingmsg",
            aliases: [
                "selfdestructingmessage",
                "selfdestructmsg",
                "selfdestrucimessage"
            ],
            group: "misc",
            memberName: "selfdestructingmsg",
            description: "Send a self destructing message",
            args:[
                {
                    key: "message",
                    prompt: "content of message",
                    type: 'string'
                },
                {
                    key: "time",
                    prompt: "time to delete",
                    type: "string",
                    validate: (val)=>{
                        let duration = Duration(val)
                        if(duration == null) return false;
                        return !isNaN(Duration(val))
                    }
                },
                {
                    key: "asUser",
                    prompt: "Send with yours nickname and avatar?",
                    type: "boolean",
                    default: true
                },
                {
                    key: "delCmd",
                    prompt: "delete the command message",
                    type: "boolean",
                    default: true
                },
                {
                    key: "channel",
                    prompt: "to wich channel send",
                    type: "text-channel",
                    default: ""
                }

            ],
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"]
        })
    }
    /**
     * @param {Discord.Message} msg 
     * @param {Object} args
     * @param {string} args.message
     * @param {string} args.time
     * @param {boolean} args.asUser
     */
    async run(msg, {message, time, asUser, delCmd, channel}){
        /** @type {Discord.Message} */
        let mess;

        /** @type {Discord.TextChannel} */
        let ch = msg.channel;
        if(channel) ch = channel;

        if(asUser){
            if(!msg.guild.me.permissions.has('MANAGE_WEBHOOKS')) return msg.reply("Can't create webhook")
            /**
             * @type {Discord.Collection<string, Discord.Webhook>}
             */
            let webhooks = await ch.fetchWebhooks()
            /**
             * @type {Discord.Webhook}
             */
            let webhook;
            for(let [str, hook] of webhooks){
                if(hook.name.includes("kajzerka")) webhook = hook;
            }
            if(!webhook){
                webhook = await ch.createWebhook("kajzerka hook")
            }
            mess = await webhook.send(message, {username: msg.member.displayName, avatarURL: msg.author.avatarURL()}).catch(console.error)
        }
        else mess = await ch.send(message)
        mess.delete({reason: "self destruct", timeout: Duration(time)})
        if(delCmd) msg.delete()
    }
}

module.exports = Cmd