import Axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
Axios.defaults.baseURL = "http://localhost:8080";
// My Components
import About from "./components/About";
import CreatePost from "./components/CreatePost";
import FlashMessages from "./components/FlashMessages";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import HomeGuest from "./components/HomeGuest";
import Terms from "./components/Terms";
import ViewSinglePost from "./components/ViewSinglePost";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
            draft.loggedIn = true;
            break;
      case "logout":
            draft.loggedIn = false;
            break;
      case "flashMessage":
            draft.flashMessages.push( action.value );
            break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
