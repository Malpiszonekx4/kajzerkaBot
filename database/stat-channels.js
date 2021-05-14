const Datastore = require('@yetzt/nedb')
const db = new Datastore({filename: "./database/stat-channels.db", autoload: true});

/**
 * @return {{guildId, channelId, text}[]} 
 */
exports.getGuildChannels = (guildId)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err,docs)=>{
            Resolve(docs)
        })
    })
}

exports.setStatChannelText = (guildId, channelId, text)=>{
    db.find({guildId: guildId, channelId: channelId}, (err, docs)=>{
        if(docs.length == 0){
            db.insert({guildId: guildId, channelId: channelId, text: text})
        }
        else{
            db.update({guildId: guildId, channelId: channelId}, {$set: {text: text}})
        }
    })
}

exports.removeStatChannel = (guildId, channelId) =>{
    db.remove({guildId: guildId, channelId: channelId})
}