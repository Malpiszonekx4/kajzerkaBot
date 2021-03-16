const Datastore = require('nedb')
const db = new Datastore({filename: "./database/muting.db", autoload: true});
/**
 * @param {String} guildId 
 * @returns {Promise<{guildId: String, muteRoleId: String, muteMsg: String}>}
 */
exports.getMuteSettings = (guildId)=>{
    return new Promise(Resolve =>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) Resolve(undefined)
            else Resolve(docs[0])
        })
    })
}

exports.setMuteRole = (guildId, muteRoleId)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) db.insert({guildId: guildId})
            db.update({guildId: guildId}, {$set: {muteRoleId: muteRoleId}})
        })
        Resolve()
    })
}

exports.setMuteMsg = (guildId, msg)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) db.insert({guildId: guildId})
            db.update({guildId: guildId}, {$set: {muteMsg: msg}})
        })
        Resolve()
    })
}

exports.setUnmuteMsg = (guildId, msg)=>{
    return new Promise(Resolve=>{
        db.find({guildId: guildId}, (err, docs)=>{
            if(docs.length == 0) db.insert({guildId: guildId})
            db.update({guildId: guildId}, {$set: {unmuteMsg: msg}})
        })
        Resolve()
    })
}