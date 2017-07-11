# xūsify

[browserify](https://github.com/substack/node-browserify/) transform for precompiling [xūs](https://github.com/tetsuo/xus).

# install

```
npm install xusify
```

# usage

```
browserify -t xusify main.js > bundle.js
```

# example

given this template, `layout.html`:

```
<div>
  <p>You have completed <b>{completedCount}</b> of your tasks. Congratulations!</p>
  <p><b>Click on more tasks to finish them!</b></p>
  <ul>
    {#todos}
        <li class="{#done}finished{/done}" onClick="toggle">{title}</li>
    {/todos}
  </ul>
<div>
```

and this state definition, in `main.js`:

```javascript
var mobxStateTree = require("mobx-state-tree")

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
})
```

create a new `state`:

```javascript
var state = State.create({
  todos: [
    { title: "Get coffee", done: false },
    { title: "Wake up", done: true }
  ]
})
```

then `require()` `template.html` and produce a `ReactElement` with it:

```javascript
var render = require("./layout.html")

var tree = render(state, {
  createElement: React.createElement,
  observer: mobxReact.observer
})
```

and render it using `ReactDOM`:

```javascript
ReactDOM.render(tree, document.getElementById("main"))
```

finally, bundle up with `browserify`:

```
browserify -t xusify main.js > bundle.js
```

[See the full example code here.](https://github.com/tetsuo/xusify/tree/master/example)

Type `npm run build` or `npm run watch` in [`example`](./example) folder.

# api

See [xūs API](https://github.com/tetsuo/xus).
