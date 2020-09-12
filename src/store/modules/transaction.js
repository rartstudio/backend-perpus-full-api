//import TransactionService from "@/services/TransactionService.js";

export const namespaced = true

export const state = {
    cart: [],
    text: null,
    linkServer: 'http://127.0.0.1:8000/'
}

export const mutations = {
    SET_TO_CART(state,data){
        state.cart.push(data)
    },
    SET_LOCAL_STORAGE(state,data){
        state.cart = data
    }
}

export const actions = {
    // fetchBooks({commit, state}){
    //     BookService.getBooks(state)
    //         .then(response => {
    //             commit('SET_BOOKS', response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // },
    sendToCart({commit,state},item){
        //if state.cart still empty
        if(state.cart.length == 0){
            commit('SET_TO_CART',item)
            localStorage.setItem('book-cart',JSON.stringify(state.cart))
        }
        //if not
        else {
            //check if id exist
            //using some will return true or false when find matching item
            const existId = state.cart.some(el => el.id === item.id)

            //if true 
            if (existId){
                state.text = 'Sudah pernah ditambahkan ke keranjang'
            }
            //if false
            else {
                commit('SET_TO_CART',item)
                state.text = 'Berhasil ditambahkan ke keranjang'
                localStorage.setItem('book-cart',JSON.stringify(state.cart))
            }
        }
        
    }
}

export const getters = {
    getCartLength: state => {
        return state.cart.length
    }
}