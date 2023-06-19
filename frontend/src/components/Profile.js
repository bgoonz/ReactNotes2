/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Page from "./Page";
import ProfilePosts from "./ProfilePosts";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
function Profile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  // profile initial state
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" },
    },
  });
  // profile useEffect
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          {
            token: appState.user.token,
          },
          { cancelToken: ourRequest.token }
        );
        // console.log(response.data);
        setState((draft) => {
          draft.profileData = response.data;
        });
      } catch (e) {
        console.log("There was a problem.", e);
      }
    }
    fetchData();
    return () => {
      // cleanup
      ourRequest.cancel();
    };
  }, [username, appState.user.token]);
  // follow user useEffect
  useEffect(() => {
    if (state.startFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoading = true;
      });
      const ourRequest = Axios.CancelToken.source();
      async function fetchData() {
        try {
          const response = await Axios.post(
            `/addFollow/${state.profileData.profileUsername}`,
            {
              token: appState.user.token,
            },
            { cancelToken: ourRequest.token }
          );
          // console.log(response.data);
          setState((draft) => {
            draft.profileData.isFollowing = true;
            draft.profileData.counts.followerCount++;
            draft.followActionLoading = false;
          });
        } catch (e) {
          console.log("There was a problem.");
        }
      }
      fetchData();
      return () => {
        // cleanup
        ourRequest.cancel();
      };
    } else {
    }
  }, [state.startFollowingRequestCount]);
  // unfollow user useEffect
  useEffect(() => {
    if (state.stopFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoading = true;
      });
      const ourRequest = Axios.CancelToken.source();
      async function fetchData() {
        try {
          const response = await Axios.post(
            `/removeFollow/${state.profileData.profileUsername}`,
            { token: appState.user.token },
            { cancelToken: ourRequest.token }
          );
          // console.log(response.data);
          setState((draft) => {
            draft.profileData.isFollowing = false;
            draft.profileData.counts.followerCount--;
            draft.followActionLoading = false;
          });
        } catch (e) {
          console.log("There was a problem.");
        }
      }
      fetchData();
      return () => {
        // cleanup
        ourRequest.cancel();
      };
    } else {
    }
  }, [state.stopFollowingRequestCount]);
  // start following function
  function startFollowing() {
    setState((draft) => {
      draft.startFollowingRequestCount++;
    });
  }
  // stop following function
  function stopFollowing() {
    setState((draft) => {
      draft.stopFollowingRequestCount++;
    });
  }
  //--------------------JSX--------------------
  return (
    <Page title="Profile Screen">
      <h2>
        <img
          className="avatar-small"
          src={state.profileData.profileAvatar}
          alt=""
        />{" "}
        {state.profileData.profileUsername}
        {appState.loggedIn &&
          !state.profileData.isFollowing &&
          appState.user.username !== state.profileData.profileUsername &&
          state.profileData.profileUsername !== "..." && (
            <button
              onClick={startFollowing}
              disabled={state.followActionLoading}
              className="btn btn-primary btn-sm ml-2"
            >
              Follow <i className="fas fa-user-plus"></i>
            </button>
          )}
        {appState.loggedIn &&
          state.profileData.isFollowing &&
          appState.user.username !== state.profileData.profileUsername &&
          state.profileData.profileUsername !== "..." && (
            <button
              onClick={stopFollowing}
              disabled={state.followActionLoading}
              className="btn btn-danger btn-sm ml-2"
            >
              Unfollow <i className="fas fa-user-times"></i>
            </button>
          )}
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {state.profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {state.profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {state.profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  );
}
export default Profile;
