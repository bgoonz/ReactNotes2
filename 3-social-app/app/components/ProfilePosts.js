import React, { useContext, useState, useEffect } from "react";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
function ProfilePosts() {
    const appState = useContext( StateContext );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ posts, setPosts ] = useState( [] );
    useEffect( () => {
        async function fetchPosts() {
            try {
                const response = await Axios.get( `/profile/${ appState.user.username }/posts` );
                setPosts( response.data );
                setIsLoading( false );
            } catch ( e ) {
                console.log( "There was a problem." );
            }
        }
        fetchPosts();
    }, [] );
    if ( isLoading ) return <LoadingDotsIcon />;
    
  return (
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src={appState.user.avatar} />{" "}
        <strong>Example Post #1</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src={appState.user.avatar} />{" "}
        <strong>Example Post #2</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src={appState.user.avatar} />{" "}
        <strong>Example Post #3</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
    </div>
  );
}

export default ProfilePosts;
