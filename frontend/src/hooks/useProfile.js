import { useContext, useEffect } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";

export default function useProfile() {
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

  return {
    state,
    startFollowing,
    stopFollowing,
  };
}
