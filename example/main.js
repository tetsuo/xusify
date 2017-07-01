const runtime = require("xup/lib/runtime")
const Template = runtime.Template

function Variable(obj, key) { this.text = obj[key] }

function Text(text) { this.text = text }

function Tree(tag, props, children) {
  this.tag = tag
  this.props = props
  this.children = children
}

var render = require("./layout.html")

var tree = render({
  title: "fruits",
  fruits: [
    { name: "Kiwi" },
    { name: "Mango" }
  ]
}, {
    treeConstructor: Tree,
    variableConstructor: Variable,
    textConstructor: Text
}, Template)

console.log(tree.children)