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

---

##### Installing React Router:

```bash
npm install react-router-dom
```

##### Importing React Router:

```js
import { BrowserRouter, Route } from "react-router-dom";
```

[**Snippet Generator for VSCode**](https://snippet-generator.app/)

**{props.children}** is a special prop that allows you to pass components as data to other components, just like any other prop you use.

**To focus an input element on load** we give it a prop of autoFocus or `autoFocus={true}`

---

### Context

- First create the context

```js
import { createContext } from "react";

const ExampleContext = createContext();

export default ExampleContext;
```

- Then wrap the components you want to provide the context to with a context provider component

```js
function Main() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexappToken"))
  );
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg));
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}
```

- Then hook into the context in your component

```js
import ExampleContext from "../ExampleContext";
function HeaderLoggedOut(props) {
  const { setLoggedIn } = useContext(ExampleContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await Axios.post("/login", {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem("complexappToken", response.data.token);
        localStorage.setItem("complexappUsername", response.data.username);
        localStorage.setItem("complexappAvatar", response.data.avatar);
   /*===========>*/     setLoggedIn(true);
        console.log("You are now logged in.");
      } else {
        console.log("Incorrect username / password.");
      }
    } catch (error) {
      console.log("There was an error.");
    }
    setUsername("");
    setPassword("");
  }


```

---

### useReducer

- useReducer is a state managment hook that is similar to useState, it accepts a reducer of type `(state,action) => newState` and returns the current state paired with a dispatch method.
- useReducer is a good alternative to useState when you have complex state logic that involves multiple sub-alues or when the next state depends on the previous one.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- a dispatch function is a function that takes an object with a type property and possibly a value (sometimes called a payload)

In the case of `dispatch({ type: "login" });` login is our action

- We can pair this up with context by setting the Context.Provider value prop to the dispatch function.

---

### Immer:

- The `immer` npm package is a powerful tool for working with immutable state in JavaScript applications. It provides a simple and convenient way to create a new immutable state by applying changes to a draft version of the state. The main idea behind immer is to make working with immutable data structures easier and more intuitive.
- With `immer`, you can update your state in a mutable way while ensuring that the original state remains unmodified. It utilizes a technique called "structural sharing" to optimize performance by minimizing unnecessary object copies.
- The package provides a single function called `produce`, which is the core of immer's functionality. The `produce` function takes an initial state and a "producer" function, which describes the desired changes to the state. Inside the producer function, you can modify the state using normal JavaScript mutative operations, such as assignment and method calls. immer takes care of tracking the changes and generating a new immutable state based on those modifications.

> ex.)

```js
import produce from "immer";

const originalState = {
  count: 0,
  todos: [],
};

const newState = produce(originalState, (draftState) => {
  draftState.count += 1;
  draftState.todos.push("Buy milk");
});

console.log(originalState); // { count: 0, todos: [] }
console.log(newState); // { count: 1, todos: ['Buy milk'] }
```

> In our app (Main.js):

- In the reducer even though you are only modifying one property in the state object you have to return a new object representing the entire new state.

```js
function ourReducer(state, action) {
  switch (action.type) {
    case "login":
      return { loggedIn: true, flashMessages: state.flashMessages };
    case "logout":
      return { loggedIn: false, flashMessages: state.flashMessages };
    case "flashMessage":
      return {
        loggedIn: state.loggedIn,
        flashMessages: state.flashMessages.concat(action.value),
      };
  }
}
//i.e.         return { loggedIn: true, flashMessages: state.flashMessages };
```

**Refactored using Immer**
`import { useImmerReducer } from "use-immer";`

```js
function ourReducer(draft, action) {
  switch (action.type) {
    case "login":
      draft.loggedIn = true;
      break;
    case "logout":
      draft.loggedIn = false;
      break;
    case "flashMessage":
      draft.flashMessages.push(action.value);
      break;
  }
}
const [state, dispatch] = useImmerReducer(ourReducer, initialState);
```

- In the example above you replace useReducer with `useImmerReducer` and you have to end each case in the switch statment with either an empty return statment or a `break;` ... (matter of personal preference)... in the example above I used break for variety's sake.

---

`<img className="avatar-tiny" src={ post.author.avatar } /> <strong>{ post.title }</strong>{ " " }`

the `{ " " }` is to add a whitespace space which react removes by default.

---

### Search Overlay

- Once we open the search overlay we want to listen for the escape key to close it. Listening for a keypress is considered a side effect so that is a perfect use case for useEffect

```js
useEffect(() => {
  document.addEventListener("keyup", searchKeyPressHandler);
  // if the user closes the search overlay we don't want to keep listening... so we need a cleanup function
  return () => document.removeEventListener("keyup", searchKeyPressHandler);
}, []);

function searchKeyPressHandler(event) {
  //escape key has keycode 27
  if (event.keyCode === 27) {
    appDispatch({ type: "closeSearch" });
  }
}
```

[useEffect Dependency Notes](./0-notes/useEffect.md)

---

### React Transition Group

[React Transition Group](https://reactcommunity.org/react-transition-group/)

- React Transition Group is a library that allows us to animate elements in and out of the DOM. It is a very popular library and is used by many other libraries and frameworks.

> usage:

```js
<CSSTransition
  timeout={330}
  in={state.isSearchOpen}
  classNames="search-overlay"
  unmountOnExit
>
  <Search />
</CSSTransition>
```

- above the timeout prop tells us how long the animation should take in milliseconds
- the in prop tells us whether or not the element should be visible
- the classNames prop tells us what the class name should be for the element while it is visible
- the unmountOnExit prop tells us that the element should be removed from the DOM once the animation is complete

```css
.search-overlay-enter {
  opacity: 0;
  transform: scale(1.3);
}

.search-overlay-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: 0.33s visibility ease-in-out, 0.33s opacity ease-in-out,
    0.33s transform ease-in-out;
}

.search-overlay-exit {
  opacity: 1;
  transform: scale(1);
}

.search-overlay-exit-active {
  opacity: 0;
  transform: scale(1.3);
  transition: 0.33s visibility ease-in-out, 0.33s opacity ease-in-out,
    0.33s transform ease-in-out;
}
```

- the above css is for the search overlay animation
- All we need to do is give the `<CSSTransition>` component a prop of `classNames="search-overlay"` and then create a css class called `.search-overlay-enter` and `.search-overlay-exit` and then add the animation properties to those classes.

- React Transition Group will then apply those classes to the element while it is animating in and out of the DOM.

---

#### Using useImmer instead of useState:

```js

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0
  });

  //...
    function handleInput(event) {
    const value = event.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
```
