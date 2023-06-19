import useSearch from "../hooks/useSearch";
import Post from "./Post";

function Search() {
  const { state, handleInput, handleSearchClose } = useSearch();

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
          <div className={"circle-loader " + (state.show === "loading" ? "circle-loader--visible" : "")}></div>
          <div className={"live-search-results " + (state.show === "results" ? "live-search-results--visible" : "")}>
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> ({state.results.length} {state.results.length > 1 ? "items" : "item"} found)
              </div>
              {state.results.map((post) => {
                return <Post post={post} key={post._id} onClick={handleSearchClose} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
