const test = require("tape")
const browserify = require("browserify")
const vm = require("vm")

test("require", t => {
    const b = browserify(__dirname + "/require/main.js")
    b.transform(require("../"))
    b.bundle((er, src) => {
        t.error(er)

        vm.runInNewContext(src, { console: { log: log } } )

        function log(fn) {
            t.throws(fn, /you must provide/)
            t.end()
        }
    })
})
