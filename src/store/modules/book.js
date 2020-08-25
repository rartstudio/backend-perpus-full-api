import BookService from '@/services/BooksService.js'

export const namespaced = true

export const state = {
    books: []
}

export const mutations = {
    SET_BOOKS(state, books){
        state.books = books
    }
}

export const actions = {
    fetchBooks({commit, state}){
        BookService.getBooks(state)
            .then(response => {
                commit('SET_BOOKS', response.data)
                console.log(response.data)
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