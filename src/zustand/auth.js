import { create } from 'zustand'
import axios from "../axios/index";

const useAuth = create((set) => ({
    state: {
        login: {},
        loading: false,
        error: false,
        message: '',
        changePassword: false
    },

    login: async (data) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/login`, data)

            localStorage.setItem('token', response.data.token)

            set({state: {message: response?.data?.message, loading: false, error: false}, });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    changePassword: async (data) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/forgot-password`, data)

            set({state: {changePassword: response?.data?.status, loading: false, error: false}, });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    setNewPassword: async (data)=>{
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/set-new-password`, data)
            console.log(response.data)

            set({state: {message: response?.data?.message, changePassword: response?.data?.status, loading: false, error: false}});
        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    register: async (data)=>{
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/register`, data)

            localStorage.setItem('token', response.data.token)

            set({state: {message: response?.data?.message, loading: false, error: false}});
        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    logout: async ()=>{
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200){
                localStorage.removeItem('token')
            }

            set({state: {message: response?.data?.message, loading: false, error: false}});
        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    },

    getMe: async ()=>{
        try {
            const response = await axios.post(`/friend/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.status){
                localStorage.removeItem('token')
            }

        } catch (err) {
            set({state: {loading: false, error: true, message: err.response.data.message}});
        }
    }

}))

export default useAuth;