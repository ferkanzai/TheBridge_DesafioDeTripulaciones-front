import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfile, postLogin, postSignUp } from "../services/auth";

export const UserContext = createContext(null);

export function useUser() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const history = useHistory();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) history.push("/login");

    getProfile(token)
      .then((user) => setUser(user))
      .catch((err) => err.code === 401 && history.push("/login"))
      .finally(() => setLoadingUser(false));
  }, []);

  const login = async (email, password) => {
    postLogin(email, password).then((res) => {
      setUser(res.data);
      localStorage.setItem("access_token", res.token);
    });
  };

  const signUp = async (email, password) => {
    postSignUp(email, password).then((res) => {
      setUser(res.data);
      localStorage.setItem("access_token", res.token);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return { user, loadingUser, login, signUp, logout, token };
}
