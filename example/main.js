var React = require("react")
var ReactDOM = require("react-dom")
var mobxReact = require("mobx-react")
var mobxStateTree = require("mobx-state-tree")

var render = require("./layout.html")

var types = mobxStateTree.types

var Todo = types.model("Todo", {
    title: types.string,
    done: true
}, {
    toggle: function() {
        this.done = !this.done
    }
})

var State = types.model("State", {
    todos: types.array(Todo),
    get completedCount() {
        return this.todos.reduce(function(count, todo) {
            return todo.done ? count + 1 : count
        }, 0)
    }
}, {
    add: function(event) {
        event.preventDefault()

        var currentTarget = event.currentTarget
        var input = currentTarget.querySelector("input[type=text]")

        if (!input.value.length) {
            return
        }

        this.todos.unshift({
            title: input.value,
            done: false
        })

        input.value = ""
    }
})

var state = State.create({
    todos: [
        { title: "Get coffee", done: false },
        { title: "Wake up", done: true }
    ]
})

var tree = render(state, {
    createElement: React.createElement,
    observer: mobxReact.observer
})

ReactDOM.render(tree, document.getElementById("main"))