import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "./constants";
export const setCookie = (k, v) => Cookies.set(k, JSON.stringify(v));
export const getCookie = (k) => Cookies.get(k);
export const removeCookie = (k) => Cookies.remove(k);

export const setUserAccessToken = (token) => setCookie(ACCESS_TOKEN, token);
export const getUserAccessToken = () => {
  const token = getCookie(ACCESS_TOKEN);
  if (token) {
    return JSON.parse(token);
  }
  return undefined;
};
export const removeUserAccessToken = () => removeCookie(ACCESS_TOKEN);
