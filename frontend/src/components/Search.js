/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import DispatchContext from "./../DispatchContext";
import Axios from "axios";
import { Link } from "react-router-dom";

function Search() {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0,
  });
  function handleSearchClose(event) {
    // event.preventDefault();
    appDispatch({ type: "closeSearch" });
  }

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler);
    // if the user closes the search overlay we don't want to keep listening... so we need a cleanup function
    return () => document.removeEventListener("keyup", searchKeyPressHandler);
  });

  //Search Debounce useEffect
  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((draft) => {
        draft.show = "loading";
      });
      const delay = setTimeout(() => {
        setState((draft) => {
          draft.requestCount++;
        });
      }, 1000);
      return () => clearTimeout(delay);
    } else {
      setState((draft) => {
        draft.show = "neither";
      });
    }
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post(
            "/search",
            { searchTerm: state.searchTerm },
            { cancelToken: ourRequest.token }
          );
          console.log(response.data);
          setState((draft) => {
            draft.results = response.data;
            draft.show = "results";
          });
        } catch (error) {
          console.log(error);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
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
          <input
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
            onChange={handleInput}
          />
          <span onClick={handleSearchClose} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div
            className={
              "circle-loader " +
              (state.show === "loading" ? "circle-loader--visible" : "")
            }
          ></div>
          <div
            className={
              "live-search-results " +
              (state.show === "results" ? "live-search-results--visible" : "")
            }
          >
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> ({state.results.length}{" "}
                {state.results.length > 1 ? "items" : "item"} found)
              </div>
              {state.results.map((post) => {
                const date = new Date(post.createdDate);
                const formattedDate = `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`;
                return (
                  <Link
                    onClick={handleSearchClose}
                    key={post._id}
                    to={`/post/${post._id}`}
                    className="list-group-item list-group-item-action"
                  >
                    <img className="avatar-tiny" src={post.author.avatar} />{" "}
                    <strong>{post.title}</strong>{" "}
                    <span className="text-muted small">
                      by {post.author.username} on {formattedDate}{" "}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
