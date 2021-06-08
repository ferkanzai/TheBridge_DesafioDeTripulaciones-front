import axios from "axios";
import { API_URL } from "../constants";

export const getChargePoints = async (lat, lng) => {
  const response = await axios.get(
    `${API_URL}/charge-points/all?latitude=${lat}&longitude=${lng}`
  );

  return response.data.data;
};

export const getFilteredChargePoints = async (
  lat,
  lng,
  distance,
  rating,
  connections,
  operators
) => {
  const response = await axios.get(
    `${API_URL}/charge-points/filter?rating=${rating}&distance=${distance}&latitude=${lat}&longitude=${lng}&connections=${connections}&operators=${operators}`
  );

  return response.data.data;
};

export const getFilteredAndCompatibleChargePoints = async (
  token,
  lat,
  lng,
  distance,
  rating,
  connections,
  operators,
  carIds
) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(
    `${API_URL}/charge-points/filter-and-compatible?rating=${rating}&distance=${distance}&latitude=${lat}&longitude=${lng}&connections=${connections}&operators=${operators}&carIds=${carIds}`,
    config
  );

  return response.data.data;
};
