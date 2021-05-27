import axios from "axios";
import { API_URL } from "../constants";

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brands/`);

  return response.data.data;
};

export const getCarsByBrand = async (brand) => {
  const response = await axios.get(`${API_URL}/cars/${brand}/available`);

  return response.data.data;
};
