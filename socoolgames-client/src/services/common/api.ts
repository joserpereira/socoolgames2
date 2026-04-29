import axios from "axios";

if (process.env.NODE_ENV !== "production") {
  console.log("mode", process.env.NODE_ENV);
  console.log("API URL:", process.env.VUE_APP_API_URL);
}

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;