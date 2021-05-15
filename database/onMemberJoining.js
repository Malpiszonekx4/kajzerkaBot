const Datastore = require('@yetzt/nedb')
const db = new Datastore({filename: "./database/onmemberjoining.db", autoload: true});

module.exports.setAutoRole = (guildId, roleId)=>{
    db.update({guildId: guildId}, {$set: {roleId: roleId}}, {upsert: true})
}
module.exports.removeAutoRole = (guildId)=>{
    db.remove({guildId: guildId})
}
module.exports.getOnJoinSettings = (guildId)=>{
    return new Promise(res=>{
        db.findOne({guildId: guildId}, (doc)=>{
            res(doc)
        })
    })
}
