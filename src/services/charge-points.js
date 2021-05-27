import axios from "axios";
import { API_URL } from "../constants";

export const getChargePoints = async () => {
  const response = await axios.get(
    `${API_URL}/charge-points/all` //?latitude=${lat}&longitude=${lng}`
  );

  return response.data.data;
};
