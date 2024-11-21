import { create } from 'zustand'
import axios from "axios";

const useStore = create((set) => ({
    events: {
        data: [
            {
                id: 1, name: 'Event 1', event_dates:[
                    {
                        id: 1, time: '10-10-2024', marathons: [
                            {
                                id: 1, name: 'Marathon 1', start_time: '15:00', end_time: '18:00', marathon_type: { name: '10km', price: 200000 },
                            },
                            {
                                id: 2, name: 'Marathon 2', start_time: '18:00', end_time: '20:00', marathon_type: { name: '3km', price: 205000 },
                            }
                        ]
                    }
                ]
            }
        ],
        loading: false,
        error: false,
    },


    fetchBears: async () => {
        set({loading: true, error: false});


        try {
            const res = await axios.get()
            set({data: res.data, loading: false, error: false});
        }catch (err) {
            set({loading: false, error: true, message: err.message});
        }
    }
}))

export default useStore;