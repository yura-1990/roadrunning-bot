import { create } from 'zustand'
import axios from "../axios/index";

const useMarathon = create((set) => ({
    state: {
        marathons: [],
        singleMarathon: [],
        loading: false,
        error: false
    },

    getSingleMarathon: async (language = 'ru', id) => {
        set({state: {loading: true, error: false}});

        try {
            const response = await axios.get(`/marathon/show/${id}`, {
                params: {
                    language
                }
            })
            console.log(response.data)
            set({state: {singleMarathon: response.data, loading: false, error: false}});

        }catch (err) {
            set({state: {loading: false, error: true, message: err.message}});
        }
    },


}))

export default useMarathon;