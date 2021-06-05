import axios from "axios";
import { API_URL } from "../constants";

export const getProfile = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/auth/profile`, config);

  return response.data.data;
};

export const postLogin = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const postSignUp = async (email, password, name) => {
  const body = { email, password, name };

  const response = await axios.post(`${API_URL}/auth/signup`, body, {
    withCredentials: true,
  });

  return response.data;
};

export const getFullProfile = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/auth/profile/full`, config);

  return response.data.data;
};
