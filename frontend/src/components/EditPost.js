import React, { useEffect, useState } from "react";
import useImmerReducer from "use-immer";
import Page from "./Page";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

import { useParams } from "react-router-dom";

function EditPost() {
    
    const initialState = {
        title: {
            value: "",
            hasErrors: false,
            message: ""
        },
        body: {
            value: "",
            hasErrors: false,
            message: ""
        },
        isFetching: true,
        isSaving: false,
        id: useParams().id,
        sendCount: 0
    }
    function ourReducer() {
     
 }
                
    const [state,dispatch]=useImmerReducer(ourReducer,initialState);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token
        });

        setIsLoading(false);
        setPost(response.data);
      } catch (error) {
        console.log("There was a problem, or the request was canceled", error);
      }
    }
    fetchPost();

    return () => {
      // cleanup
      ourRequest.cancel();
    };
  }, [id]);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  return (
    <Page title="Edit Post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" value={post.title} />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text" value={post.body} />
        </div>

        <button className="btn btn-primary">Save Updates</button>
      </form>
    </Page>
  );
}

export default EditPost;
