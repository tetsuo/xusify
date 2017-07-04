var React = require("react")
var ReactDOM = require("react-dom")
var mobx = require("mobx")
var mobxReact = require("mobx-react")

var state = mobx.observable({
  title: "fruits",
  fruits: [
    { name: "Mango" },
    { name: "Kiwi" }
  ]
})

var render = require("./layout.html")

var tree = render(state, {
	React: React,
	mobx: mobx,
	mobxReact: mobxReact
})

ReactDOM.render(tree, document.getElementById("main"))

setTimeout(function() {
	state.fruits.push({ name: "Oranje" })
}, 1000)
