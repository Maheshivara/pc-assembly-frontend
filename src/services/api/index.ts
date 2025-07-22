import axios from "axios";

const USER_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_BASE_URL;

export const userApi = axios.create({
  baseURL: `${USER_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const componentsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COMPONENTS_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
