/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import DispatchContext from "./../DispatchContext";
import Axios from "axios";
function Search() {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0
  });
  function handleSearchClose(event) {
    event.preventDefault();
    appDispatch({ type: "closeSearch" });
  }

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler);
    // if the user closes the search overlay we don't want to keep listening... so we need a cleanup function
    return () => document.removeEventListener("keyup", searchKeyPressHandler);
  });
  useEffect(() => {
    const delay = setTimeout(() => {
        setState((draft) => {
            draft.requestCount++;
        });
    }, 1000);
    return () => clearTimeout(delay);
  }, [state.searchTerm]);

    useEffect( () => {
        if(state.requestCount) {
            //send axios request here
        }
    }, [state.requestCount]);
    
  function searchKeyPressHandler(event) {
    //escape key has keycode 27
    if (event.keyCode === 27) {
      appDispatch({ type: "closeSearch" });
    }
  }
  function handleInput(event) {
    const value = event.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
  }
  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" onChange={handleInput} />
          <span onClick={handleSearchClose} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> (3 items found)
              </div>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" alt="gravitar" /> <strong>Example Post #1</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" alt="gravitar" /> <strong>Example Post #2</strong>
                <span className="text-muted small">by barksalot on 2/10/2020 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" alt="gravitar" /> <strong>Example Post #3</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
