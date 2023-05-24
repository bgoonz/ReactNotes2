import React, { useState, useEffect } from "react";

import LoadingDotsIcon from "./LoadingDotsIcon";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

function ProfilePosts() {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);

        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("There was a problem.", error);
      }
    }
    fetchPosts();
  }, [username]);
  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={post.author.avatar} alt="" />{" "}
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">
              {!post.isDeleted && <> on {dateFormatted} </>}
              {post.isDeleted && (
                <>
                  {" "}
                  <strong className="text-danger">Deleted</strong>{" "}
                </>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
