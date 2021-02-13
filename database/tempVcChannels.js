const Datastore = require('nedb')
const db = new Datastore({filename: "./database/tempVcChannels.db", autoload: true});

exports.addVcChannel = (channelId, guildId)=>{
    db.insert({guildId: guildId, channelId: channelId})
}

exports.deleteVcChannel = (channelId, guildId)=>{
    db.remove({guildId: guildId, channelId: channelId})
}

exports.getVcChannel = (channelId, guildId)=>{
    return new Promise(Resolve=>{
        db.findOne({guildId: guildId, channelId: channelId}, (err,doc)=>{
            Resolve(doc)
        })
    })
}

exports.getVcChannels = (guildId)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err,doc)=>{
            Resolve(doc)
        })
    })
}