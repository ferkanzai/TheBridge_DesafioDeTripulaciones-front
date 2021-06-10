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

  let token = localStorage.getItem("access_token");

  useEffect(() => {
    getProfile(token)
      .then((user) => setUser(user))
      .catch((err) => err.code === 401 && history.push("/"))
      .finally(() => setLoadingUser(false));

    getFavoritesChargePoints(token).then(setUserFavorites);
    getActiveReservation(token).then((res) => setActiveReservation(res[0]));
  }, [history, token]);

  const login = async (email, password, cb) => {
    postLogin(email, password).then((res) => {
      if (res.status === 200) {
        setUser(res.data.data);
        token = localStorage.setItem("access_token", res.data.token);
      } else {
        cb(res);
      }
    });
  };

  const signUp = async (email, password, name, cb) => {
    postSignUp(email, password, name).then((res) => {
      if (res.status === 201) {
        setUser(res.data.data);
        localStorage.setItem("access_token", res.data.token);
      } else {
        cb(res);
      }
    });
  };

  const logout = () => {
    setUser(null);
    setUserFavorites([]);
    setActiveReservation(null);
    setUserContextLat(null);
    setUserContextLng(null);
    setShowNoMore(null);
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
