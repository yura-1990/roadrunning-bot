import { create } from 'zustand'
import axios from "../axios/index";

const useParticipant = create((set) => ({
    state: {
        regions: [],
        singleEvent: {},
        loading: false,
        error: false,
    },

    getEvents: async (language = 'ru') => {
        set({loading: true, error: false});

        try {
            const response = await axios.get('/event/all', {
                params: {
                    language, paginate
                }
            })

            set({state: {events: response.data}, loading: false, error: false});

        }catch (err) {
            set({loading: false, error: true, message: err.message});
        }
    },


}))

export default useParticipant;