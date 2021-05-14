const Datastore = require('@yetzt/nedb')
const db = new Datastore({filename: "./database/mutes.db", autoload: true});

exports.setMute = (userId, guildId, duration)=>{
    return new Promise((resolve)=>{
        db.insert({userId, guildId, duration}, (err,doc)=>{
            if(err) console.log(err)
            resolve(doc)
        })
    })
}

exports.deleteMute = (userId, guildId)=>{
    db.remove({userId, guildId})
}
/**
 * @returns {Promise<{userId, guildId, duration}[]>}
 */
exports.getMutes = ()=>{
    return new Promise((resolve)=>{
        resolve(db.getAllData())
    })
}

exports.removeMuteById = (id)=>{
    db.remove({_id: id})
}
exports.removeMuteByUserId = (usrId)=>{
    db.remove({userId: usrId})
}