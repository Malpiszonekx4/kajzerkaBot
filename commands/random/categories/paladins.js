module.exports.damages = [
	"Bomb King",
	"Cassie",
	"Dredge",
	"Drogoz",
	"Imani",
	"Kinessa",
	"Lian",
	"Sha Lin",
	"Strix",
	"Tiberius",
	"Tyra",
	"Viktor",
	"Vivian",
	"Willo",
]

module.exports.tanks = [
	"Ash",	
	"Atlas",
	"Barik",
	"Fernando",
	"Khan",
	"Inara",
	"Makoa",
	"Raum",
	"Ruckus",
	"Terminus",
	"Torvald"
]

module.exports.healers = [

	"Corvus",
	"Furia",
	"Grohk",
	"Grover",
	"Io",
	"Jenos",
	"Mal'Damba",
	"Pip",
	"Seris",
	"Ying"
]

module.exports.flanks = [
	"Vora",
	"Buck",
	"Evie",
	"Koga",
	"Lex",
	"Maeve",
	"Moji",
	"Skye",
	"Talus",
	"Zhin"
]

module.exports.all = new Array().concat(module.exports.damages).concat(module.exports.tanks).concat(module.exports.healers).concat(module.exports.flanks)

module.exports.notanks = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.nohealers = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.noflanks = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.nodamages = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)