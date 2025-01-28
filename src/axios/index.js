import axios from "axios";
const apiUrl = 'http://api.roadrunning.uz/api';

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    }
})