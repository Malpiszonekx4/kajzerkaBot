module.exports.getRandomInteger = (min, max) => {
    let r = Math.round(Math.random() * (max - min) + min)
    return r
}