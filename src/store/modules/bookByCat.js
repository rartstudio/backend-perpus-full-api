import BookService from '@/services/BooksService.js'

export const namespaced = true

export const state = {
    booksByCat: []
}

export const mutations = {
    SET_BOOKS(state, books){
        state.booksByCat = books
    }
}

export const actions = {
    fetchBooks({commit},{query,value}){
        BookService.getBooksByCat(query, value)
            .then(response => {
                commit('SET_BOOKS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getters = {
    getBooks: state => {
        return state.books
    }
}