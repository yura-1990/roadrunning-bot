import { create } from 'zustand'
import useEvent from '../zustand/events'

const useCart = create((set, get) => ({
    state: {
        carts: [],
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

    addToCart: (newCart)=>{
        if (localStorage.getItem('cart')) {
            const getCart = JSON.parse(localStorage.getItem('cart'))
            getCart.push(newCart)
      
            localStorage.setItem('cart', JSON.stringify(getCart))
        } else {
            localStorage.setItem('cart', JSON.stringify([newCart]))
        }

        set({ carts: [...get().state.carts, newCart] });    
    },

    deleteCart: (cart)=>{
        set({ state: { carts: cart } });
        localStorage.setItem('cart', JSON.stringify(cart))
    }, 

    deleteAllCarts: ()=>{
        set({ state: { carts: [] } });
        localStorage.setItem('cart', JSON.stringify([]))
    }
}))

export default useCart;