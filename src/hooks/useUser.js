import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfile, postLogin, postSignUp } from "../services/auth";
import { getFavoritesChargePoints } from "../services/favorites";

export function useUser() {
  const [user, setUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const history = useHistory();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getProfile(token)
      .then((user) => setUser(user))
      .catch((err) => err.code === 401 && history.push("/"))
      .finally(() => setLoadingUser(false));

    getFavoritesChargePoints(token).then(setUserFavorites);
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

  return {
    user,
    loadingUser,
    login,
    signUp,
    logout,
    token,
    userFavorites,
    setUserFavorites,
  };
}
