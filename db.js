const sqlite3 = require('sqlite3');
const db  = new sqlite3.Database('./db.db',(err)=>{
    if(err) throw new Error(err.message)
    console.log("db connected")
});

exports.createCounter = (displayName, internalName)=>{
    return new Promise(Resolve=>{
        db.get(`SELECT * FROM counting WHERE id='${internalName}'`, (err, row)=>{
            if(row == undefined){
                db.exec(`INSERT INTO counting(count, name, id) VALUES(0, '${displayName}', '${internalName}')`)
                Resolve("succes")
            }
            else {
                Resolve("exists")
            }
        })
    })
}

exports.countCounter = (countName)=>{
    return new Promise(Resolve=>{
        db.get(`SELECT * FROM counting WHERE id='${countName}'`, (err, row)=>{
            if(row == undefined){
                Resolve("404")
            }
            else {
                let c = Number.parseInt(row.count)
                let cpp = c+1;
                db.exec(`UPDATE counting SET count=${cpp} WHERE id='${countName}'`, (err)=>{
                    if(err) console.log(err)
                })
                Resolve({
                    "name":row.name,
                    "oldV":c,
                    "newV":cpp
                })
            }
        })
    })
}

exports.getCounters = ()=>{
    return new Promise(Resolve=>{
        db.all(`SELECT * FROM COUNTING`, (err,rows)=>{
            if(rows.length == 0) Resolve("no counters")
            else{
                Resolve(rows)
            }
        })
    })
}