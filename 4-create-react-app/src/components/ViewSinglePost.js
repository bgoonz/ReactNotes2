import React, { useEffect, useState, useContext } from "react";
import Page from "./Page";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";
import StateContext from "../StateContext";
import { useParams, Link } from "react-router-dom";
function ViewSinglePost() {
    const appState = useContext( StateContext );
    const { id } = useParams();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ post, setPost ] = useState( [] );
    useEffect( () => {
        async function fetchPost() {
            try {
                const response = await Axios.get( `/post/${id}` );
                console.log( response.data );
                setIsLoading( false );
                setPost( response.data );
            } catch ( error ) {
                console.log( "There was a problem.", error );
            }
        }
        fetchPost();
    }, [id] );
    
                if ( isLoading ) return <LoadingDotsIcon />;
  return (
      <Page title={post.title }>
      <div className="d-flex justify-content-between">
        <h2>Example Post Title</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img
            className="avatar-tiny"
    src={appState.user.avatar}
            alt="avatar"
          />
        </a>
        Posted by <Link to="#">{appState.user.username}</Link> on {post.createdDate}
      </p>

      <div className="body-content">
        <p>
          Lorem ipsum dolor sit <strong>example</strong> post adipisicing elit.
          Iure ea at esse, tempore qui possimus soluta impedit natus voluptate,
          sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat
          asperiores at.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quod
          asperiores corrupti omnis qui, placeat neque modi, dignissimos, ab
          exercitationem eligendi culpa explicabo nulla tempora rem? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Iure ea at esse, tempore
          qui possimus soluta impedit natus voluptate, sapiente saepe modi est
          pariatur. Aut voluptatibus aspernatur fugiat asperiores at.
        </p>
      </div>
    </Page>
  );
}

export default ViewSinglePost;
