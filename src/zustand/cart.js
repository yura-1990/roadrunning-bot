import { create } from 'zustand'
import useEvent from '../zustand/events'
import axios from "../axios";

const useCart = create((set, get) => ({
    state: {
        carts: [],
        loading: false,
        error: false,
        message: ''
    },

    getCarts: async () => {
        if (localStorage.getItem('cart')) {
            const getCart = JSON.parse(localStorage.getItem('cart'))
            localStorage.setItem('cart', JSON.stringify(getCart))
            set({ state: { carts: getCart } });    
        } else {
            localStorage.setItem('cart', JSON.stringify([]))
            set({ state: { carts: [] } });
        }     
    },

    deleteCart: async (index)=>{
        try {
            const allCards = localStorage.getItem('cart');

            if (allCards) {
                const allCardsArray = JSON.parse(allCards);
                const card = allCardsArray[index];
                allCardsArray.splice(index, 1);
                const response = await axios.delete(`/number-status/delete/${card.id}`)
                localStorage.setItem('cart', JSON.stringify(allCardsArray))
                console.log(response)
            }
        }
        catch (err){
            set({ state:{ loading: false, error: true, message: err.message }});
        }


    }, 

    deleteAllCarts: async ()=>{
        try {
            const allCards = localStorage.getItem('cart');
            if (allCards) {
                const allCardsArray = JSON.parse(allCards);

                await Promise.all(
                    allCardsArray.map(card => axios.delete(`/number-status/delete/${card.id}`))
                );

                localStorage.setItem('cart', JSON.stringify([]));
            }

            set({ state: { carts: [],  loading: false, error: false} });
        } catch (err) {
            set({ state:{ loading: false, error: true, message: err.message }});
        }
    },

    formatWithSpaces: (num) => {
        const withCommas = new Intl.NumberFormat('en-US').format(num);
        return withCommas.replace(/,/g, ' ');
    }
}))

export default useCart;