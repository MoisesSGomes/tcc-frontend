import axios from "axios";

const api = axios.create({
    baseURL:"https://letsgoparty-api.onrender.com"
})

export default api