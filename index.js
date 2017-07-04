const through = require("through2")
const duplexify = require("duplexify")
const xus = require("xus")
const path = require("path")

module.exports = function xusify(file, opts) {
    if (!opts) {
        opts = {}
    }

    const extension = opts.extension || ".html"

    if (extension !== path.extname(file)) {
        return through()
    }

    const tr = through()
    const packer = xus.createPacker()

    packer.once("data", data => {
		const res =
			'var ext = require("' + __dirname + '/ext");' +
			'module.exports = ext.r.bind(null, ' + String(data) + ')'
        tr.end(res)
    })

    return duplexify(packer, tr)
}