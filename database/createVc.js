const Datastore = require('@yetzt/nedb')
const db = new Datastore({filename: "./database/createVc.db", autoload: true});

exports.setCreateVcChannelId = (channelId, guildId)=>{
    db.findOne({guildId: guildId}, (err, doc)=>{
        if(err) return console.error(err)
        if(doc == null) db.insert({guildId: guildId, channelId: channelId})
        else db.update({guildId: guildId}, {$set: {channelId: channelId}})
    })
}

exports.getCreateVcChannelId = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc.channelId)
        })
    })
}

exports.setCreateVcChannelName = (name, guildId)=>{
    db.findOne({guildId: guildId}, (err, doc)=>{
        if(err) return console.error(err)
        if(doc == null) db.insert({guildId: guildId, name: name})
        else db.update({guildId: guildId}, {$set: {name: name}})
    })
}

exports.getCreateVcChannelName = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc.name)
        })
    })
}

exports.setCreateVcChannelCategory = (categoryId, guildId)=>{
    db.findOne({guildId: guildId}, (err, doc)=>{
        if(err) return console.error(err)
        if(doc == null) db.insert({guildId: guildId, categoryId: categoryId})
        else db.update({guildId: guildId}, {$set: {categoryId: categoryId}})
    })
}

exports.getCreateVcChannelCategory = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc.categoryId)
        })
    })
}
/**
 * 
 * @param {string} guildId 
 * @returns {boolean} `true` when editing permissions
 */
exports.getCreatedVcChannelEditPerms = (guildId)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) Resolve(undefined)
            else Resolve(doc.editperms == 'true' ? true : false)
        })
    })
}

exports.setCreatedVcChannelEditPerms = (guildId, canedit)=>{
    return new Promise(Resolve =>{
        db.findOne({guildId: guildId}, (err, doc)=>{
            if(err) return console.error(err)
            if(doc == null) db.insert({guildId: guildId, editperms: canedit})
            else db.update({guildId: guildId}, {$set: {editperms: canedit}})
        })
    })
}