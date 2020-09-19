/* eslint-disable */
import BookService from "@/services/BooksService.js"

export const namespaced = true

export const state = {
    books: [],
    booksByOne : [],
    booksByTwo : [],
    relatedBooks: [],
    recommendationBooks: [],
    book: {},
    isLoading: true,
    skeletonCount: 4,
    linkServer: 'http://127.0.0.1:8000/'
}

export const mutations = {
    SET_BOOK(state,book){
        state.book = book
    },
    SET_RELATED_BOOKS(state,data){
        state.relatedBooks = data
    },
    SET_BOOKS(state, books){
        state.books = books
    },
    SET_BOOKS_BY_ONE(state,bookByOne){
        state.booksByOne = bookByOne
    },
    SET_RECOMMENDATION_BOOKS(state, books){
        state.recommendationBooks = books
    }
}

export const actions = {
    fetchRecommendationBooks({commit}){
        return BookService.getRecommendationBooks()
            .then(response => {
                commit('SET_RECOMMENDATION_BOOKS',response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchRelatedBooks({commit},{query,value}){
        return BookService.getBooksBy(query, value)
            .then(response => {
                commit('SET_RELATED_BOOKS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchBooks({commit, state}){
        return BookService.getBooks(state)
            .then(response => {
                commit('SET_BOOKS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchBooksBy({commit,state},{query,value}){
        return BookService.getBooksBy(query, value)
            .then(response => {
                commit('SET_BOOKS_BY_ONE', response.data)
                //set loader to false so data can appear immediately
                state.isLoading = false
            })
            .catch(error => {
                console.log(error)
            })
    },
    //set a second parameter for slug
    fetchBook({commit,dispatch},slug){
        //add return to wait response bookservice
        return BookService.getBook(slug)
            .then(response => {
                //commiting data to state and return it to router index
                commit('SET_BOOK', response.data.data)
                state.isLoading = false
                commit('transaction/SET_TEXT',null,{ root: true })
                commit('transaction/SET_SNACKBAR',false,{ root: true })
                dispatch('fetchRelatedBooks','cat',state.book.categories.name)
            })
    }
}

export const getters = {
    getBooks: state => {
        return state.books
    },
    getLinkServer : state => {
        return state.linkServer
    }
}