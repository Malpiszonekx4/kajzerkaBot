const axios = require('axios').default;

const {getRandomInteger} = require('./utils');

require("dotenv").config()

/**
 * 
 * @param {string} search 
 * @returns {{gifUrl, url}}
 */

module.exports.randomGif = (search)=>{
    return new Promise(async (resolve)=>{
        let res = await axios.get(`https://g.tenor.com/v1/random?key=${process.env.tenorApiKey}&limit=10${search ? `&q=${search}` : ""}`)
        let randomInt = getRandomInteger(0, 9)
        let result = res.data.results[randomInt];
        let gif = res.data.results[randomInt].media[0].gif;

        resolve({gifUrl: gif.url, url: result.itemurl})
    })
}
module.exports.randomGif("ban")