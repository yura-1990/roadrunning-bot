import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL ?? process.env.REACT_API_BASE_LOCAL_URL;

console.log(apiUrl);


export default axios.create({
    baseURL: apiUrl,
    headers: {
        'content-type': 'application/json',
    }
})