const Commando = require('discord.js-commando');
const client = new Commando.Client({owner: "440169257817473045",commandPrefix: "!"})

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.registry
        .registerGroups([
            ["counters","Counters commands"],
            ["random", "command to randomising things"]
        ])
        .registerDefaults({
            unknownCommand: false
        })
        .registerCommandsIn(__dirname+"/commands");
});

/* client.on('message', async(msg) => {
    if(!msg.content.startsWith(prefix)) return;
    if(msg.author.bot) return;
    let args = msg.content.split(" ");
    let cmd = args.shift().replace("!","");

    console.log(args)
    if(cmd == "addCounter"){
        if(args.length <=1){
            let countName = args;
        }
    }
}); */
client.login(process.env.token);