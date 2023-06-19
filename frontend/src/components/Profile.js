import React, { useContext } from "react";
import Page from "./Page";
import ProfilePosts from "./ProfilePosts";
import useProfile from "../hooks/useProfile";
import StateContext from "../StateContext";
function Profile() {
  const { state, startFollowing, stopFollowing } = useProfile();
  const appState = useContext(StateContext);

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
