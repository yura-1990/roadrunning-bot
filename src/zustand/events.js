import { create } from 'zustand'
import axios from "../axios/index";

const useEvent = create((set) => ({
    state: {
        events: [],
        singleEvent: {},
        loading: false,
        error: false,
    },

    getEvents: async (language = 'ru', paginate = 25) => {
        set({loading: true, error: false});

        try {
            const response = await axios.get('/event/all', {
                params: {
                    language, paginate
                }
            })

            console.log(response.data)

            set({state: {events: response.data}, loading: false, error: false});

        } catch (err) {
            set({loading: false, error: true, message: err.message});
        }
    },

    getOneEvent: async (language = 'ru', id) => {
        set({loading: true, error: false});

        try {
            const response = await axios.get(`/event/show/${id}`, {
                params: {
                    language
                }
            })

            set({state: {singleEvent: response.data}, loading: false, error: false});

            console.log(language,response.data)

        }catch (err) {
            set({loading: false, error: true, message: err.message});
        }
    },

    formatEventDateRange: (marathons, t) => {
        if (!marathons || marathons.length === 0) return 'Upcoming events'

        const startDateString = marathons[0].date_event
        const endDateString = marathons[marathons.length - 1].date_event

        const startDate = new Date(startDateString)
        const endDate = new Date(endDateString)

        const formatDate = (date, includeYear = true) => {
            const day = date.getDate().toString().padStart(2, '0')
            const month = t(date.toLocaleString('en', { month: 'long' }).toLowerCase())
            const year = date.getFullYear()
            return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`
        }

        const sameMonth = startDate.getMonth() === endDate.getMonth()
        const sameYear = startDate.getFullYear() === endDate.getFullYear()

        let formattedStartDate = formatDate(startDate, !sameYear)
        const formattedEndDate = formatDate(endDate)

        if (sameMonth && sameYear) {
            formattedStartDate = startDate.getDate().toString().padStart(2, '0')
        }

        return `${formattedStartDate} - ${formattedEndDate}`
    },

    formatDate: (dateString, t)=> {
      const date = new Date(dateString)

      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const monthKey = date.toLocaleString('en', { month: 'long' }).toLowerCase()
        const year = date.getFullYear()

        const month = t(`${monthKey}`)

        return `${day} ${month} ${year}`
      }

      return formatDate(date)
    },


}))

export default useEvent;