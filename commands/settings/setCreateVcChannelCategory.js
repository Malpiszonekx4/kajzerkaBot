const { CategoryChannel } = require("discord.js")
const Commando = require("discord.js-commando")

const {setCreateVcChannelCategory} = require("../../database/createVc.js")

class SetCreateVcChannelCategory extends Commando.Command{
    constructor(client){
        super(client,{
            name:"createvccategory",
            group: "settings",
            memberName: "createvccategory",
            description: "Set default category of created channel",
            args:[
                {
                    key: "category",
                    prompt: "Category id",
                    type: 'category-channel'
                }
            ],
            userPermissions: [
                "MANAGE_CHANNELS"
            ]
        })
    }
    /**
     * @param {Commando.CommandoMessage} msg 
     * @param {Object} args
     * @param {CategoryChannel} args.category
     */
    async run(msg, {category}){
        setCreateVcChannelCategory(category.id, msg.guild.id)
    }
}

module.exports = SetCreateVcChannelCategory