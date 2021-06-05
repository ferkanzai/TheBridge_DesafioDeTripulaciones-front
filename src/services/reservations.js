import axios from "axios";
import { API_URL } from "../constants";

export const postStartReservation = (token, connectionId) => {};

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
