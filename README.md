# xūsify

browserify transform for precompiling [xūs](https://github.com/tetsuo/xus).

# Install

```
npm install xusify
```

# Example

given this template, `layout.html`:

```html
<div>
  <h1>{title}</h1>
  {#fruits}
    <li>{name}</li>
  {/fruits}
</div>
```

you can require it as a pre-compiled function that can be evaluated for rendering:

`main.js`

```js
var render = require("./layout.html") // here u go

var React = require("react")
var ReactDOM = require("react-dom")
var mobx = require("mobx")
var mobxReact = require("mobx-react")

var state = mobx.observable({ // create observable state
  title: "fruits",
  fruits: [
    { name: "Mango" },
    { name: "Kiwi" }
  ]
})

var el = render(state, {
	React: React,
	mobx: mobx,
	mobxReact: mobxReact
})

ReactDOM.render(el, document.getElementById("main"))

// add new fruit after waiting 1 second, this will be re-rendered automatically
setTimeout(function() {
	state.fruits.push({ name: "Oranje" })
}, 1000)
```

then bundle up with browserify:

```
browserify -t xusify main.js > bundle.js
```

# API

See [xūs](https://github.com/tetsuo/xus).

# License

MIT