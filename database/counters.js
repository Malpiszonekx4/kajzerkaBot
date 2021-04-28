const Datastore = require('nedb')
const db = new Datastore({filename: "./database/counters.db", autoload: true});

/**
 * @typedef {Object} Counter
 * @property {string} name - `internalName` of counter
 * @property {number} count - value of counter
 * @property {string} creatorId
 */


/**
 * 
 * @param {String} displayName Display name of counter
 * @param {String} internalName name of counter used in commands
 * @returns {"succes" | "exists"} `succes` if created successfully
 * @returns {"succes" | "exists"} `exists` when counter with `internalname` exists
 */
exports.createCounter = (displayName, internalName, creatorId)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName},(err, docs)=>{
            if(docs.length == 0){
                db.insert({"internalName": internalName, "displayName": displayName, "count": 0, creatorId: creatorId})
                Resolve("succes")
            }
            else Resolve("exists")
        })
    })
}

/**
 * @param {string} internalName `internalName` of counter
 * @returns {Counter}
 */
exports.countCounter = (internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName}, (err, docs)=>{
            if(docs.length == 0) Resolve("404")
            else{
                let c = Number.parseInt(docs[0].count)
                let cpp = c+1;
                db.update({internalName: internalName}, {$set: {count: cpp}})
                docs[0].count = cpp;
                docs[0].oldCount = c;
                Resolve(docs[0])
            }
        })
    })
}
/**
 * @returns {"no cunters" | Counter}[]}
 */
exports.getCounters = ()=>{
    return new Promise(Resolve=>{
        let data = db.getAllData()
        if(data.length == 0) Resolve("no counters")
        else{
            Resolve(data)
        }
    })
}
/**
 * @param {string} internalName `internalName` of counter to delete
 * @returns {"404" | "done"} "404" if no counter exists with given `counterName` 
 * @returns {"404" | "done"} `done` if done succesfull
 */
exports.removeCounter = (internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName}, (err, docs)=>{
            if(docs.length == 0){
                Resolve("404")
            }
            else{
                db.remove({internalName: internalName})
                Resolve("done")
            }
        })
    })
}
/**
 * @param {string} internalName `internalName` of counter to get
 * @returns {Counter}
 */
exports.getCounter = (internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName}, (err, docs)=>{
            Resolve(docs[0])
        })
    })
}