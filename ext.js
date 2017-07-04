var x = require("xus/lib/react")

module.exports = {
	"r": function(render, state, options) {
		return x.buildReactTree(render, state, options)
	}
}
