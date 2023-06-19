import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfileConnections({ type }) {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchConnections() {
      try {
        const response = await Axios.get(`/profile/${username}/${type}`, {
          cancelToken: ourRequest.token,
        });

        setConnections(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("There was a problem.", error);
      }
    }

    fetchConnections();

    return () => {
      // Cleanup
      ourRequest.cancel();
    };
  }, [username, type]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {connections.map((connection, index) => (
        <Link
          to={`/profile/${connection.username}`}
          key={index}
          className="list-group-item list-group-item-action"
        >
          <img className="avatar-tiny" src={connection.avatar} alt="" />
          {connection.username}
        </Link>
      ))}
    </div>
  );
}

export default ProfileConnections;
