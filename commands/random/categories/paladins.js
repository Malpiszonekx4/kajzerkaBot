module.exports.champions = {}

module.exports.champions.damages = [
	"Bomb King",
	"Cassie",
	"Dredge",
	"Drogoz",
	"Imani",
	"Kinessa",
	"Lian",
	"Octavia",
	"Sha Lin",
	"Strix",
	"Tiberius",
	"Tyra",
	"Viktor",
	"Vivian",
	"Willo"
]

module.exports.champions.tanks = [
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
	"Torvald",
	"Yagorath"
]

module.exports.champions.healers = [

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

module.exports.champions.flanks = [
	"Vora",
	"Buck",
	"Evie",
	"Koga",
	"Lex",
	"Maeve",
	"Moji",
	"Skye",
	"Talus",
	"Zhin",
	"Vatu"
]

module.exports.champions.all = new Array().concat(module.exports.damages).concat(module.exports.tanks).concat(module.exports.healers).concat(module.exports.flanks)

module.exports.champions.notanks = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.champions.nohealers = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.champions.noflanks = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)
module.exports.champions.nodamages = new Array().concat(module.exports.damages).concat(module.exports.healers).concat(module.exports.flanks)

module.exports.gamemodes = [
	"Siege",
	"Team DM",
	"King of the Hill",
	"Onslaught"
]

module.exports.maps = {}

module.exports.maps.siege = [
	"Frog Isle",
	"Jaguar Falls",
	"Serpen Beach",
	"Frozen Guard",
	"Ice Mines",
	"Fish Market",
	"Timber Mill",
	"Stone Keep",
	"Brightmarsh",
	"Splitstone Quarry",
	"Ascension Peak",
	"Warder's Gate",
	"Shattered Desert",
	"Bazaar"
]
module.exports.maps.onslaught = [
	"Primal Court",
	"Foreman's Rise",
	"Magistrate's Archives",
	"Marauder's Port"
]
module.exports.maps.koth = [
	"Snowfall Junction",
	"Magistrate's Archives",
	"Trade District",
	"Marauder's Port"
]
module.exports.maps.tdm = [
	"Snowfall Junction",
	"Trade District",
	"Abbys",
	"Throne",
	"Dragon Arena"
]