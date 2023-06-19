import { useContext, useEffect } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import { useParams } from "react-router-dom";

function useProfileData(username, token) {
  const [profileData, setProfileData] = useImmer({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          { token },
          { cancelToken: ourRequest.token }
        );
        setProfileData(response.data);
      } catch (error) {
        console.log("There was a problem.", error);
      }
    }

    fetchData();

    return () => {
      // cleanup
      ourRequest.cancel();
    };
  }, [username, token, setProfileData]);

  return profileData;
}

function fetchFollowData(apiUrl, token, draft) {
  return new Promise(async (resolve, reject) => {
    const ourRequest = Axios.CancelToken.source();

    try {
      const response = await Axios.post(
        apiUrl,
        { token },
        { cancelToken: ourRequest.token }
      );
      resolve(response.data);
    } catch (error) {
      console.log("There was a problem.", error);
      reject(error);
    } finally {
      // cleanup
      ourRequest.cancel();
    }
  });
}

export default function useProfile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const profileData = useProfileData(username, appState.user.token);

  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData,
  });

  useEffect(() => {
    setState((draft) => {
      draft.profileData = profileData;
    });
  }, [profileData, setState]);

  useEffect(() => {
    if (state.startFollowingRequestCount && !state.profileData.isFollowing) {
      setState((draft) => {
        draft.followActionLoading = true;
      });

      fetchFollowData(
        `/addFollow/${state.profileData.profileUsername}`,
        appState.user.token,
        state
      )
        .then(() => {
          setState((draft) => {
            draft.profileData.isFollowing = true;
            draft.profileData.counts.followerCount++;
            draft.followActionLoading = false;
          });
        })
        .catch(() => {
          // ignore errors
        });
    }
  }, [state, setState, appState.user.token]);

  useEffect(() => {
    if (state.stopFollowingRequestCount && state.profileData.isFollowing) {
      setState((draft) => {
        draft.followActionLoading = true;
      });

      fetchFollowData(
        `/removeFollow/${state.profileData.profileUsername}`,
        appState.user.token,
        state
      )
        .then(() => {
          setState((draft) => {
            draft.profileData.isFollowing = false;
            draft.profileData.counts.followerCount--;
            draft.followActionLoading = false;
          });
        })
        .catch(() => {
          // ignore errors
        });
    }
  }, [state, setState, appState.user.token]);

  const startFollowing = () => {
    setState((draft) => {
      draft.startFollowingRequestCount++;
    });
  };

  const stopFollowing = () => {
    setState((draft) => {
      draft.stopFollowingRequestCount++;
    });
  };

  return { state, startFollowing, stopFollowing };
}
