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

    const rstream = through()
    const wstream = through()

    const dup = duplexify(wstream, rstream)

    wstream.on("data", data => {
        const src = data.toString()
        const cstream = xus.compile(src, (er, ctx) => {
            if (er) {
                return dup.emit("error", er)
            }
            const m =
                'var ext = require("' + __dirname + '/ext");' +
                'module.exports = ext.r.bind(null, ' + String(ctx) + ')'

            rstream.push(m)
        })
    })

    wstream.on("end", () => {
        rstream.end()
    })

    return dup
}