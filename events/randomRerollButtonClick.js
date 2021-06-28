const {CommandoClient} = require('discord.js-commando');
const Random = require('../commands/random/random');

/** @param {CommandoClient} bot */
async function event(bot) {
    bot.on('clickButton', async (button)=>{
        let msg = button.message
        let args = JSON.parse(button.id)
        let random = new Random(bot)
        random.run(msg, args)
        button.defer();
    })
}
module.exports = event