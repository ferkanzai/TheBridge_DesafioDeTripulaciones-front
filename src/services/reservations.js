import axios from "axios";
import { API_URL } from "../constants";

export const postStartReservation = async (token, connectionId) => {
  try {
    const config = {
      headers: {
        authorization: token,
      },
      withCredentials: true,
    };

    const response = await axios.post(
      `${API_URL}/reservations/start/${connectionId}`,
      {},
      config
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserReservations = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/reservations/past`, config);

  return response.data.data;
};

export const getActiveReservation = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/reservations/`, config);

  return response.data.data;
};

export const putExtendReservation = async (token, reservationId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.put(
    `${API_URL}/reservations/extend/${reservationId}`,
    {},
    config
  );

  return response.data.data;
};

export const putCancelReservation = async (token, reservationId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.put(
    `${API_URL}/reservations/cancel/${reservationId}`,
    {},
    config
  );

  return response.data.data;
};
