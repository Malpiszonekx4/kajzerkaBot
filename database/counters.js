const Datastore = require('nedb')
const db = new Datastore({filename: "./database/counters.db", autoload: true});

/**
 * @typedef {Object} Counter
 * @property {string} name - `internalName` of counter
 * @property {number} oldV - old value of counter
 * @property {number} newV - new value of counter
 */


/**
 * 
 * @param {String} displayName Display name of counter
 * @param {String} internalName name of counter used in commands
 * @returns {"succes" | "exists"} `succes` if created successfully
 * @returns {"succes" | "exists"} `exists` when counter with `internalname` exists
 */
exports.createCounter = (displayName, internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName},(err, docs)=>{
            if(docs.length == 0){
                db.insert({"internalName": internalName, "displayName": displayName, "count": 0})
                Resolve("succes")
            }
            else Resolve("exists")
        })
    })
}

/**
 * @param {string} internalName `internalName` of counter
 * @returns {{oldV: number, newV: number, internalName: string}}
 */
exports.countCounter = (internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName}, (err, docs)=>{
            if(docs.length == 0) Resolve("404")
            else{
                let c = Number.parseInt(docs[0].count)
                let cpp = c+1;
                db.update({internalName: internalName}, {$set: {count: cpp}})

                Resolve({
                    "internalName":docs[0].internalName,
                    "oldV":c,
                    "newV":cpp
                })
            }
        })
    })
}
/**
 * @returns {"no cunters" | {internalName: string, displayName: string, count: number}[]}
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
 * @returns {{internalName: string, displayName: string, count: number}}
 */
exports.getCounter = (internalName)=>{
    return new Promise(Resolve=>{
        db.find({internalName: internalName}, (err, docs)=>{
            Resolve(docs[0])
        })
    })
}