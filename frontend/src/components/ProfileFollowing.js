import React, { useEffect, useState } from "react";

import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfileFollowing() {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, {
          cancelToken: ourRequest.token,
        });

        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("There was a problem.", error);
      }
    }
    fetchPosts();
    return () => {
      // cleanup
      ourRequest.cancel();
    };
  }, [username]);
  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link
            to={`/profile/${follower.username}`}
            key={index}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={follower.avitar} alt="" />{" "}
            {follower.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollowing;