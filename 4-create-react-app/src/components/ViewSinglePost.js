import React, { useEffect, useState, useContext } from "react";
import Page from "./Page";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

import { useParams, Link } from "react-router-dom";

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`);
        console.log(response.data);
        setIsLoading(false);
        setPost(response.data);
      } catch (error) {
        console.log("There was a problem.", error);
      }
    }
    fetchPost();
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
          <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />
        </a>
        Posted by <Link to="#">{post.author.username}</Link> on {formatedDate()}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
}

export default ViewSinglePost;
