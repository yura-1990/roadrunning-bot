import { create } from 'zustand'

const useCart = create((set, get) => ({
    state: {
        carts: [],
    },


    getCarts: () => {
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
    }
}))

export default useCart;