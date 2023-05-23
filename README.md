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
