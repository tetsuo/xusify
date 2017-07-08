var x = require("xus/lib/runtime")

module.exports = {
    "r": function(render, state, options) {
        return x.render(render, state, options)
    }
}
