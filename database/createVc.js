const Datastore = require('nedb')
const db = new Datastore({filename: "./database/createVc.db", autoload: true});

exports.setCreateVcChannelId = (channelId, guildId)=>{
    db.findOne({guildId: guildId}, (err, doc)=>{
        if(err) return console.error(err)
        if(doc == null) db.insert({guildId: guildId, channelId: channelId, rowType:"createVcChannelId"})
        else db.update({guildId: guildId, rowType:"createVcChannelId"}, {$set: {channelId: channelId}})
    })
}

exports.getCreateVcChannelId = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId, rowType:"createVcChannelId"}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc)
        })
    })
}

exports.setCreateVcChannelName = (name, guildId)=>{
    db.findOne({guildId: guildId, rowType:"createVcChannelName"}, (err, doc)=>{
        if(err) return console.error(err)
        if(doc == null) db.insert({guildId: guildId, name: name, rowType:"createVcChannelName"})
        else db.update({guildId: guildId, rowType:"createVcChannelId"}, {$set: {name: name}})
    })
}

exports.getCreateVcChannelName = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId, rowType:"createVcChannelName"}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc)
        })
    })
}