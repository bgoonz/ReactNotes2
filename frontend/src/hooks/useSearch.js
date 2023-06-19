import { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import DispatchContext from "./../DispatchContext";
import Axios from "axios";

function useSearch() {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0,
  });

  useEffect(() => {
    function searchKeyPressHandler(event) {
      // Escape key has keycode 27
      if (event.keyCode === 27) {
        appDispatch({ type: "closeSearch" });
      }
    }

    document.addEventListener("keyup", searchKeyPressHandler);

    // If the user closes the search overlay, we don't want to keep listening, so we need a cleanup function
    return () => {
      document.removeEventListener("keyup", searchKeyPressHandler);
    };
  }, [appDispatch]);

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

      return () => {
        clearTimeout(delay);
      };
    } else {
      setState((draft) => {
        draft.show = "neither";
      });
    }
  }, [state.searchTerm, setState]);

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

      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.requestCount, state.searchTerm, setState]);

  function handleInput(event) {
    const value = event.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
  }

  function handleSearchClose(event) {
    // event.preventDefault();
    appDispatch({ type: "closeSearch" });
  }

  return {
    state,
    handleInput,
    handleSearchClose,
  };
}

export default useSearch;
