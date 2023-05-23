import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Page from "./Page";
import { useNavigate } from "react-router-dom";
import ExampleContext from "../ExampleContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { addFlashMessage } = useContext(ExampleContext);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title: title,
        body: body,
        token: localStorage.getItem("complexappToken"),
      });
      //redirect to new post url
      console.log(response.data);
      addFlashMessage("Congrats, you successfully created a post.");
      navigate(`/post/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(event) => setBody(event.target.value)}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default CreatePost;
