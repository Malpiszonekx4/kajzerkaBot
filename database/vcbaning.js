const DataStore = require('nedb')
const db = new DataStore({file: 'vcbaning.db'})

exports.setVcBannedRole = (guildId, roleId) => {
    db.update({guildId}, {$set: {roleId}}, {upsert: true})
}

/**
 * @returns {Promise<{guildId, roleId}>}
 */
exports.getVcBannedRole = (guildId) => {
    return new Promise((resolve)=>{
        db.findOne({guildId}, (err, doc)=>{
            if(err) console.log(err)
            resolve(doc)
        })
    })
}