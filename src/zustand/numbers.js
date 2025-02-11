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

            if (localStorage.getItem('cart')) {
                const getCart = JSON.parse(localStorage.getItem('cart'))
                getCart.push(response.data)

                localStorage.setItem('cart', JSON.stringify(getCart))

                console.log(getCart)
            } else {
                localStorage.setItem('cart', JSON.stringify([response.data]))
            }

            set({state: {numberStatus: response.data, loading: false, error: false}, });

        } catch (err) {
            set({state: {loading: false, error: true, message: err.message}});
        }
    },


}))

export default useNumber;