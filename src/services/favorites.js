import axios from "axios";
import { API_URL } from "../constants";

export const getFavoritesChargePoints = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/favorites/`, config);

  return response.data.data;
};

export const deleteRemoveFavorite = async (token, favoriteId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.delete(
    `${API_URL}/favorites/remove/${favoriteId}`,
    config
  );

  return response.data.data;
};
