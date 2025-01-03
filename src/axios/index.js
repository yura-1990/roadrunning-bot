import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL // 'http://localhost:8000/api' process.env.REACT_API_BASE_LOCAL_URL || process.env.REACT_APP_API_URL;

export default axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
    }
})