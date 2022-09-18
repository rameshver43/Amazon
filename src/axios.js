import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/fir-7a28d/us-central1/api", //api url(cloud function) URL
});

export default instance;
