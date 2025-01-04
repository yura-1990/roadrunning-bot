import { create } from 'zustand'
import axios from "../axios/index";

const useNumber = create((set) => ({
    state: {
        numberStatus: [],
        loading: false,
        error: false
    },

    createNumberStatus: async (data) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.post(`/number-status/create`, data)
            console.log(response.data)
            set({state: {numberStatus: response.data, loading: false, error: false}, });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.message}});
        }
    },


}))

export default useNumber;