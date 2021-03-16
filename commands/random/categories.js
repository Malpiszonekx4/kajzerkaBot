const fs = require('fs');

let categories = {}
let files = fs.readdirSync(__dirname+"/categories")
files.forEach(function (file) {
    // Do whatever you want to do with the file
    categories[file.replace(".js", "")] = require(`./categories/${file}`)
});
module.exports = categories