import axios from "axios";
import { API_URL } from "../constants";

export const getConenctionsByChargePoint = async (chargePointId) => {
  const response = await axios.get(`${API_URL}/connections/${chargePointId}`);

  return response.data.data;
};
