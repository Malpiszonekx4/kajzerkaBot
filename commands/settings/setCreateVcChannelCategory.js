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
            ]
        })
    }
    /**
     * 
     * @param {Commando.CommandoMessage} msg 
     */
    async run(msg, {category}){
        setCreateVcChannelCategory(category, msg.guild.id)
    }
}

module.exports = SetCreateVcChannelCategory