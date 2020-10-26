import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://foodie-react.firebaseio.com/orders",
});

export default axiosInstance;
