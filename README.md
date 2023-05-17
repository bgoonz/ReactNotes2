# React Notes

### DOM Approach:

- DOM is a tree structure of HTML elements and we use javascript to modify the DOM.
- Working with the dom is relatively slow, whereas working with javascript objects is fast.

### React (Declaration) Approach:

- React is a javascript library for building user interfaces.
- React uses a declarative approach to build user interfaces.
- React uses a virtual DOM to keep track of changes and then updates the actual DOM.

### Using React:

```html
<div id="app"></div>
```

```js
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(React.createElement('h1', null, 'Hello World!')
//first argument is the type of element you want to create, second argument is the props, and the third argument is the children
```
