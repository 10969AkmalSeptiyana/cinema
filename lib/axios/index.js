import axios from "axios";

export function getRequest(URL, params) {
  const axiosClient = axios.create();

  axiosClient.defaults.baseURL = process.env.BASE_URL;

  axiosClient.defaults.headers = {
    "Content-Type": "application/json;charset=utf-8",
    Accept: "application/json",
  };

  axiosClient.defaults.params = {
    api_key: process.env.API_KEY,
    ...params,
  };

  return axiosClient.get(`${URL}`).then((response) => response);
}
