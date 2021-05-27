import axios from "axios";
import { API_URL } from "../constants";

export const getUserCars = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/users/cars`, config);

  return response.data.data;
};

export const postAddUserCar = async (token, carId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.post(
    `${API_URL}/users/add-car/${carId}`,
    {},
    config
  );

  return response.data.data;
};

export const deleteRemoveUserCar = async (token, userCarId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.delete(
    `${API_URL}/users/remove-car/${userCarId}`,
    config
  );

  return response.data.data;
};

export const putChangePrimaryCar = async (token, userCarId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.put(
    `${API_URL}/users/car/change-primary/${userCarId}`,
    {},
    config
  );

  return response.data.data;
};

export const getSingleUserCarById = async (token, userCarId) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.get(`${API_URL}/users/car/${userCarId}`, config);

  return response.data.data;
};

export const putUpdateUserCarAlias = async (token, userCarId, alias) => {
  const config = {
    headers: {
      authorization: token,
    },
    withCredentials: true,
  };

  const response = await axios.put(
    `${API_URL}/users/car/change-alias/${userCarId}?alias=${alias}`,
    {},
    config
  );

  return response.data.data;
};
