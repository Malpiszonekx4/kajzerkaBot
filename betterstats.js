const {Client, GuildMember} = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @returns {Promise<Number>}
 */
module.exports.getUsers = (client)=>{
    return new Promise(async (Resovle)=>{
        let usersN = 0;
        /**
         * @type {GuildMember[]}
         */
        let m = []
        for(let guild of client.guilds.cache.array()){
            let members = await (await guild.members.fetch()).array()
            for(let member of members){
                if(member.user.bot) continue
                if(m.some((gm)=>{return gm.id == member.id;})) continue
                m.push(member)
                usersN = usersN+1;
            }
        }        
        Resovle(usersN)
    })
}