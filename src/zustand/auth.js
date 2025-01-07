import { create } from 'zustand'
import axios from "../axios/index";
import {useNavigate} from "react-router-dom";

const useAuth = create((set) => ({
    state: {
        login: {},
        loading: false,
        error: false,
        message: '',
        changePassword: false,
        token: false,
    },

    login: async (data) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/login`, data)

            localStorage.setItem('token', response.data.token)

            set({state: {message: response?.data?.message, loading: false, error: false, token: !!response.data.token}, });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    changePassword: async (data) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/forgot-password`, data)

            set({state: {changePassword: response.data.status, loading: false, error: false} });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    setNewPassword: async (data)=>{
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/set-new-password`, data)

            set({state: {message: response?.data?.message, changePassword: response.data.status, loading: false, error: false}});

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    register: async (data)=>{
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/register`, data)

            localStorage.setItem('token', response.data.token)

            set({state: {message: response?.data?.message, loading: false, error: false, token: !!response.data.token}});
        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    logout: async ()=>{
        try {
            const response = await axios.post(`/friend/logout`, {})

            localStorage.removeItem('token')

        } catch (err) {
            localStorage.removeItem('token')
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    getToken: async ()=>{
        const token = localStorage.getItem('token')

        set({ state: { token: token } });
    }

}))

export default useAuth;