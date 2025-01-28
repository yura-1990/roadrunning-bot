import { create } from 'zustand'
import axios from "../axios";

const useInvoice = create((set, get) => ({
    state: {
        payment: [],
        paymentStatus: false,
        message: {},
        code: '',
        error: '',
        invoiceStatus: [],
        errorCode: '',
        invoices: []
    },

    createTransaction: async (data)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/invoice/create`, data, {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data)

            if (response.status === 200){
                localStorage.setItem('invoice_number', JSON.stringify(response.data))
                set({ state: { payment: response.data, paymentStatus: true } });
            }
        }
        catch (error){
            set({ state:{ loading: false, error: true, message: error.response.data.errors }})

        }


    },

    checkInvoice: async(data)=> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/invoice/check/code`, data, {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data)
        }
        catch (error){
            set({ state:{ loading: false, error: true, message: error.response.data.errors }})
        }
    }
}))

export default useInvoice;