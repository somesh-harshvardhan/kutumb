import axios from "axios";
import { getUserAccessToken, removeUserAccessToken } from "./cookie";
import { routes } from "./routes";

const axiosInstance = axios.create({
  baseURL: "https://assignment.stage.crafto.app",
  timeout: 10000,
});
//to make the routes privates dynamically
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const pathname = window.location.pathname;
      if ((status === 401 || status === 403) && pathname !== routes.login) {
        removeUserAccessToken();
        window.location.href = routes.login; // Redirects to login page
      }
    }
    return Promise.reject(error);
  }
);

export const loginApiCall = async (username, otp) => {
  const payload = { username, otp };
  const response = await axiosInstance.post(`/login`, payload);
  return response.data.token;
};

export const getQuotesList = async (limit, offset) => {
  const response = await axiosInstance.get(`/getQuotes`, {
    headers: { Authorization: getUserAccessToken() },
    params: { limit, offset },
  });
  return response.data;
};

export const uploadMedia = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const payload = new FormData();
  payload.append("file", file);

  try {
    const response = await axios.post(
      "https://crafto.app/crafto/v1.0/media/assignment/upload",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.mediaUrl;
  } catch (error) {
    throw error;
  }
};

export const createQuote = async (text, mediaUrl) => {
  await axiosInstance.post(
    `/postQuote`,
    { text, mediaUrl },
    { headers: { Authorization: getUserAccessToken() } }
  );
};
