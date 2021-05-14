const Datastore = require('@yetzt/nedb')
const db = new Datastore({filename: "./database/reactionRoles.db", autoload: true});
/**
 * @returns {Promise<{messageId, emoji, roleId, guildId, channelId, mode}[]>}
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
 * @returns {Promise<{messageId, emoji, roleId, guildId, channelId, mode}>}
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
/**
 * @param {"singe" || "multi"} mode 
 * @param {String} messageId 
 * @param {String} guildId 
 * @param {String} channelId 
 */
exports.setMode = (mode, messageId,) => {
    db.update({messageId: messageId}, {$set: {mode: mode}}, {multi: true})
}