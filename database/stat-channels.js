const Datastore = require('nedb')
const db = new Datastore({filename: "./database/stat-channels.db", autoload: true});

exports.getGuildChannels = (guildId)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err,docs)=>{
            Resolve(docs)
        })
    })
}

exports.setChannelText = (guildId, channelId, text)=>{
    let f = db.find({guildId: guildId, channelId: channelId}, (err, docs)=>{
        console.log(docs)
        if(docs.length == 0){
            db.insert({guildId: guildId, channelId: channelId, text: text})
        }
        else{
            db.update({guildId: guildId, channelId: channelId}, {$set: {text: text}})
        }
    })
}