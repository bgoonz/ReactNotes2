import React, { useEffect, useState } from "react";
import Page from "./Page";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

import { useParams, Link } from "react-router-dom";

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
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
  function formatedDate() {
    const date = new Date(post.createdDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link to="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </Link>
          <Link
            to={`#`}
            className="delete-post-button text-danger"
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </Link>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {formatedDate()}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
}

export default ViewSinglePost;
