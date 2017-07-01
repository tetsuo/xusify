const through = require("through2")
const duplexify = require("duplexify")
const xus = require("xup")
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
        tr.end("module.exports=" + String(data))
    })

    return duplexify(packer, tr)
}