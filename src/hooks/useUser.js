import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfile, postLogin, postSignUp } from "../services/auth";
import { getFavoritesChargePoints } from "../services/favorites";
import { getActiveReservation } from "../services/reservations";

export function useUser() {
  const [user, setUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [activeReservation, setActiveReservation] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [status, setStatus] = useState(0);
  const [userContextLat, setUserContextLat] = useState(null);
  const [userContextLng, setUserContextLng] = useState(null);
  const [showNoMore, setShowNoMore] = useState(false);
  const history = useHistory();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getProfile(token)
      .then((user) => setUser(user))
      .catch((err) => err.code === 401 && history.push("/"))
      .finally(() => setLoadingUser(false));

    getFavoritesChargePoints(token).then(setUserFavorites);
    getActiveReservation(token).then((res) => setActiveReservation(res[0]));
  }, [history, token]);

  const login = async (email, password) => {
    postLogin(email, password).then((res) => {
      setUser(res.data);
      localStorage.setItem("access_token", res.token);
    });
  };

  const signUp = async (email, password, name) => {
    postSignUp(email, password, name).then((res) => {
      setUser(res.data);
      localStorage.setItem("access_token", res.token);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      if (status < 10) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(11);
            setUserContextLat(position.coords.latitude);
            setUserContextLng(position.coords.longitude);
          },
          () => {
            setStatus(status + 1);
          }
        );
      }
    }
  }, [status]);

  return {
    user,
    loadingUser,
    login,
    signUp,
    logout,
    token,
    userFavorites,
    setUserFavorites,
    activeReservation,
    setActiveReservation,
    userContextLat,
    userContextLng,
    showNoMore,
    setShowNoMore,
  };
}
