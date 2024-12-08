/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

export const setCookieWithMinutesExpiration = (
  name: string,
  value: string,
  minutes: number
): void => {
  const now = new Date();
  now.setTime(now.getTime() + minutes * 60 * 1000);
  Cookies.set(name, value, { expires: now });
};

export const getRouteName = () =>
  location.pathname.split("/").splice(0, 2).join("/");

export const logout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  Cookies.remove("DR_AT");
  Cookies.remove("DR_RT");

  // deleteToken(messaging);
  window.location.href = "/login";
};

export const sessionSetter = (name: string, value: string) => {
  sessionStorage.setItem(name, value);
};

export const buildUrlWithParams = (
  baseUrl: string,
  params: { [key: string]: any }
): string => {
  const queryParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((item) => queryParams.append(key, item));
    } else {
      queryParams.append(key, value);
    }
  }

  return `${baseUrl}?${queryParams.toString()}`;
};

export const sessionGetter = (name: string) => {
  return sessionStorage.getItem(name);
};

export const filterDataForEdit = (
  oldData: Record<string, any>,
  newData: Record<string, any>
): Record<string, any> => {
  for (const key of Object.keys(oldData)) {
    if (oldData[key] === undefined) {
      oldData[key] = null;
    }
  }
  for (const key of Object.keys(newData)) {
    if (newData[key] === undefined && key !== "password") {
      newData[key] = null;
    }
  }
  const filteredData: Record<string, any> = {};
  for (const key of Object.keys(newData)) {
    if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
      if (newData[key] === "" || JSON.stringify(newData[key]) === "[]") {
        newData[key] = null;
      }
      filteredData[key] = newData[key];
    }
  }
  return filteredData;
};
