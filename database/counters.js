const Datastore = require('nedb')
const db = new Datastore({filename: "./counters.db", autoload: true});
exports.createCounter = (displayName, internalName)=>{
    return new Promise(Resolve=>{
        db.find({name: internalName},(err, docs)=>{
            if(docs.length == 0){
                console.log(internalName)
                console.log(displayName)
                db.insert({"name": internalName, "displayName": displayName, "count": 0})
                Resolve("succes")
            }
            else Resolve("exists")
        })
    })
}

exports.countCounter = (countName)=>{
    return new Promise(Resolve=>{
        db.find({name: countName}, (err, docs)=>{
            if(docs.length == 0) Resolve("404")
            else{
                let c = Number.parseInt(docs[0].count)
                let cpp = c+1;
                db.update({name: countName}, {$set: {count: cpp}}, {multi: true})

                Resolve({
                    "name":docs[0].name,
                    "oldV":c,
                    "newV":cpp
                })
            }
        })
    })
}

exports.getCounters = ()=>{
    return new Promise(Resolve=>{
        let data = db.getAllData()
        if(data.length == 0) Resolve("no counters")
        else{
            Resolve(data)
        }
    })
}