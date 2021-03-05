const Datastore = require('nedb')
const db = new Datastore({filename: "./database/reactionRoles.db", autoload: true});
/**
 * @returns {Promise<{messageId, emoji, roleId, guildId, channelId}[]>}
 */
exports.getReactionRoles = (messageId)=>{
    return new Promise(Resolve =>{
        db.find({messageId: messageId}, (err, docs)=>{
            if(docs.length == 0) Resolve(undefined)
            else Resolve(docs)
        })
    })
}
/**
 * @returns {Promise<{messageId, emoji, roleId, guildId, channelId}>}
 */
exports.getReactionRole = (messageId, emoji)=>{
    return new Promise(Resolve =>{
        db.findOne({messageId: messageId, emoji: emoji}, (err, docs)=>{
            if(docs.length == 0) Resolve(undefined)
            else Resolve(docs)
        })
    })
}

exports.setReactionRole = (messageId, guildId, channelId, roleId, emoji)=>{
    return new Promise(Resolve=>{
        db.find({messageId: messageId, roleId: roleId}, (err, docs)=>{
            if(docs.length == 0){
                db.insert({messageId: messageId, roleId: roleId, guildId: guildId, channelId: channelId, emoji: emoji}, (err,doc)=>{
                    Resolve(doc)
                })
            }else{
                Resolve("exists")
            }
        })
    })
}

exports.removeReactionRole = (messageId, emoji)=>{
    db.remove({messageId: messageId, emoji: emoji})
}