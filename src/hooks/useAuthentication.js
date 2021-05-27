import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password, errorCb) {
    // localStorage.removeItem("access_token");

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      setUser(res.data.data);
      localStorage.setItem("access_token", res.data.token);
    } catch (err) {
      console.log(err);
      errorCb(err.response.info);
    }
  }

  async function signup(email, password, errorCb) {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });
      setUser(res.data.data);
      localStorage.setItem("access_token", res.data.token);
    } catch (err) {
      errorCb(err.response.info);
    }
  }

  async function getProfile(token) {
    setLoading(true);
    const config = {
      headers: {
        authorization: token,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, config);
      setUser(res.data.data);
    } catch (err) {
      console.error(err.response.info);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("access_token");
  }

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getProfile(token).catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    login,
    signup,
    logout,
    getProfile,
    loading,
    setLoading,
    token,
  };
}
