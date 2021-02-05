const Datastore = require('nedb')
const db = new Datastore({filename: "./database/settings.db", autoload: true});

exports.getMuteRole = (guildId)=>{
    return new Promise(Resolve =>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) Resolve(undefined)
            else Resolve(docs[0])
        })
    })
}

exports.setMuteRole = (guildId, roleId)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) db.insert({guildId: guildId, roleId: roleId})
            else db.update({guildId: guildId}, {$set: {roleId: roleId}})
        })
        Resolve()
    })
}