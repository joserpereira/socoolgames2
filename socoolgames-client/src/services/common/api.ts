import axios from "axios";

// console.log("API URL:", process.env.VUE_APP_API_URL);
// console.log("API PORT:", process.env.VUE_APP_API_PORT);
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;