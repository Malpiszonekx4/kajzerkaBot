const {Client} = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @returns {Promise<Number>}
 */
module.exports.getUsers = (client)=>{
    return new Promise(async (Resovle)=>{
        let usersN = 0;
        await client.guilds.cache.forEach(async (guild)=>{
            let members = await guild.members.fetch()
            members.forEach((member)=>{
                if(!member.user.bot) usersN = usersN+1;
            })
        })
        Resovle(usersN)
    })
}