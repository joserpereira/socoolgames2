import axios from "axios";

if (import.meta.env.MODE !== "production") {
  console.log("mode", import.meta.env.MODE);
  console.log("API URL:", import.meta.env.VITE_APP_API_URL);
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;