import axios from "axios";
import { API_URL } from "../constants";

export const getChargePoints = async (lat, lng) => {
  const response = await axios.get(
    `${API_URL}/charge-points/all?latitude=${lat}&longitude=${lng}`
  );

  return response.data.data;
};

export const getSingleChargePoint = async (chargePointId, lat, lng) => {
  const response = await axios.get(
    `${API_URL}/charge-points/single/${chargePointId}?latitude=${lat}&longitude=${lng}`
  );

  return response.data.data;
};

export const getFilteredChargePoints = async (
  lat,
  lng,
  distance,
  rating,
  connections,
  operators,
  connectionTypes
) => {
  const response = await axios.get(
    `${API_URL}/charge-points/filter?rating=${rating}&distance=${distance}&latitude=${lat}&longitude=${lng}&connections=${connections}&operators=${operators}&connectionTypes=${connectionTypes}`
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
  carIds,
  connectionTypes
) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(
    `${API_URL}/charge-points/filter-and-compatible?rating=${rating}&distance=${distance}&latitude=${lat}&longitude=${lng}&connections=${connections}&operators=${operators}&carIds=${carIds}&connectionTypes=${connectionTypes}`,
    config
  );

  return response.data.data;
};
