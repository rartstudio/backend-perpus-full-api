import BookService from '@/services/BooksService.js'

export const namespaced = true

export const state = {
    books: [],
    booksByOne : [],
    booksByTwo : [],
    book: {}
}

export const mutations = {
    SET_BOOK(state,book){
        state.book = book
    },
    SET_BOOKS(state, books){
        state.books = books
    },
    SET_BOOKS_BY_ONE(state,bookByOne){
        state.booksByOne = bookByOne
    }
}

export const actions = {
    fetchBooks({commit, state}){
        BookService.getBooks(state)
            .then(response => {
                commit('SET_BOOKS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchBooksBy({commit},{query,value}){
        BookService.getBooksBy(query, value)
            .then(response => {
                commit('SET_BOOKS_BY_ONE', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    //set a second parameter for slug
    fetchBook({commit},slug){
        //add return to wait response bookservice
        return BookService.getBook(slug)
            .then(response => {
                //commiting data to state and return it to router index
                commit('SET_BOOK', response.data)
                return response.data
            })
    }
}

export const getters = {
    getBooks: state => {
        return state.books
    }
}