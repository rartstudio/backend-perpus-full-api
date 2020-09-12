//import TransactionService from "@/services/TransactionService.js";

export const namespaced = true

export const state = {
    cart: [],
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
        commit('SET_TO_CART',item)
        localStorage.setItem('book-cart',JSON.stringify(state.cart))
    }
}

export const getters = {
    getCartLength: state => {
        return state.cart.length
    }
}