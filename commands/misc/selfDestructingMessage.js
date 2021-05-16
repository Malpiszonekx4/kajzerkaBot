const Discord = require("discord.js");
const Commando = require("discord.js-commando")

const Duration = require('parse-duration').default;

class Clear extends Commando.Command{
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
                    default: "1min",
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
                    default: false
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
    async run(msg, {message, time, asUser}){
        /** @type {Discord.Message} */
        let mess;
        if(asUser){
            if(!msg.guild.me.permissions.has('MANAGE_WEBHOOKS')) return msg.reply("Can't create webhook")
            /**
             * @type {Discord.Collection<string, Discord.Webhook>}
             */
            let webhooks = await msg.channel.fetchWebhooks()
            /**
             * @type {Discord.Webhook}
             */
            let webhook;
            for(let [str, hook] of webhooks){
                if(hook.name.includes("kajzerka")) webhook = hook;
            }
            if(!webhook){
                webhook = await msg.channel.createWebhook("kajzerka hook")
            }
            mess = await webhook.send(message, {username: msg.member.displayName, avatarURL: msg.author.avatarURL()}).catch(console.error)
        }
        else mess = await msg.channel.send(message)
        mess.delete({reason: "self destruct", timeout: Duration(time)})
    }
}

module.exports = Clear