import axios from "axios";
const apiUrl = 'https://api.roadrunning.uz/api';

export default axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
    }
})