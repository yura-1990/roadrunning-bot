import { create } from 'zustand'
import axiosInstance from "../axios";
import axios from 'axios'

const useInvoice = create((set, get) => ({
    state: {
        payment: [],
        paymentStatus: false,
        message: {},
        code: '',
        error: '',
        invoiceStatus: [],
        errorCode: '',
        invoices: [],
        success: false,
    },

    createTransaction: async (data)=>{
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.post(`/invoice/create`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 200){
                localStorage.setItem('invoice_number', JSON.stringify(response.data))
                set({ state: { payment: response.data, paymentStatus: true } });
            }
        }
        catch (error){
            if (axios.isAxiosError(error)) {
                set({ state:{ loading: false, error: true, message: error.response.data.errors }})
                console.log(error.response.data.errors)
            } else {
                set({ state:{ loading: false, error: true, message: 'unknown_error' }})
                console.log('An unknown error occurred', error);
            }
        }


    },

    checkInvoice: async(data)=> {
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.post(`/invoice/check/code`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 200){
                set({ state: { paymentStatus: false, success: true } });
            }

            console.log(response.data)
        }
        catch (error){
            if (axios.isAxiosError(error)) {
                set({ state:{ loading: false, error: true, message: error.response.data.errors }})
                console.log(error)
            } else {
                set({ state:{ loading: false, error: true, message: 'unknown_error' }})
                console.log('An unknown error occurred', error);
            }
            set({ state: { success: false } });
        }
    },

    remove: ()=> {
        set({ state: { success: false } });
    }
}))

export default useInvoice;