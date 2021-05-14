const DataStore = require('@yetzt/nedb');
const db = new DataStore({filename: "./database/vcbans.db", autoload: true})

/**
 * @typedef VcBan
 * @property {} guildId
 * @property {} userId
 * @property {} duration
 * @property {} reason
 */

/**
 * @returns {VcBan}
 */
exports.addVcBan = (guildId, userId, duration, reason)=>{
    return new Promise((resolve)=>{
        db.insert({guildId, userId, duration, reason}, (err, doc)=>{
            if(err) console.log(err)
            resolve(doc)
        })
    })
}

exports.removeVcBan = (guildId, userId) => {
    db.remove({guildId, userId})
}
/**
 * @returns {Promise<VcBan>}
 */
exports.getVcBan = (guildId, userId) => {
    return new Promise((resolve)=>{
        db.findOne({guildId, userId}, (err, doc)=>{
            if(err) console.log(err)
            resolve(doc)
        })
    })
}
/**
 * @returns {Promise<VcBan[]>}
 */
 exports.getVcBans = (guildId) => {
    return new Promise((resolve)=>{
        resolve(db.getAllData())
    })
}