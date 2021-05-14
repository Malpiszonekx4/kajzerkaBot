const DataStore = require('@yetzt/nedb')
const db = new DataStore({filename: './database/vcbaning.db', autoload: true})

exports.setVcBannedRole = (guildId, roleId) => {
    db.update({guildId: guildId}, {$set: {roleId: roleId}}, {upsert: true})
}
exports.setVcBannedMsg = (guildId, msg) => {
    db.update({guildId: guildId}, {$set: {banMsg: msg}}, {upsert: true})
}
exports.setVcUnBannedMsg = (guildId, msg) => {
    db.update({guildId: guildId}, {$set: {unBanMsg: msg}}, {upsert: true})
}

/**
 * @returns {Promise<{guildId, roleId, banMsg, unBanMsg}>}
 */
exports.getVcBaningSettings = (guildId) => {
    return new Promise((resolve)=>{
        db.findOne({guildId}, (err, doc)=>{
            if(err) console.log(err)
            resolve(doc)
        })
    })
}