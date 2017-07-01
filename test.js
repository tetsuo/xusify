const xusify = require("./")
const browserify = require("browserify")
const test = require("tape")
const vm = require("vm")

const dir = __dirname + "/example"

test("xusify", t => {
    const expected = [
        { "text": "\n  " },
        { "tag": "h1", "props": {}, "children": [ { "text": "fruits" } ] },
        { "text": "\n  " },
        { "text": "\n    " },
        { "tag": "li", "props": {}, "children": [ { "text": "Kiwi" } ] },
        { "text": "\n  " },
        { "text": "\n    " },
        { "tag": "li", "props": {}, "children": [ { "text": "Mango" } ] },
        { "text": "\n  " },
        { "text": "\n" }
    ]

    browserify(dir + "/main.js")
        .transform(xusify)
        .bundle((er, src) => {
            t.error(er)

            vm.runInNewContext(src.toString(), {
                console: {
                    log: function log(s) {
                        t.deepEqual(s, expected)
                        t.end()
                    }
                }
            })
        })
})