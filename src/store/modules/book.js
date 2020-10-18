/* eslint-disable */
import BookService from "@/services/BooksService.js"
import NProgress from 'nprogress';


export const namespaced = true

export const state = {
    books: [],
    categories: [],
    allBooks: [],
    snackbarState: false,
    booksByOne : [],
    booksByTwo : [],
    relatedBooks: [],
    searchResult: [],
    recommendationBooks: [],
    book: {},
    isLoading: true,
    skeletonCount: 4,
    linkServer: 'http://127.0.0.1:8000/'
}

export const mutations = {
    SET_ALL_BOOKS(state,book){
        state.allBooks = book
    },
    SET_BOOK(state,book){
        state.book = book
    },
    SET_SEARCH_RESULT(state, result){
        state.searchResult = result
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
    },
    SET_CATEGORIES(state,data){
        state.categories = data
    }
}

export const actions = {
    fetchCategoriesBook({commit}){
        state.isLoading = true
        return BookService.getCategories()
            .then(response => {
                commit('SET_CATEGORIES',response.data)
                state.isLoading = false
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchAllBooks({commit},data = null){
        state.isLoading = true
        NProgress.start()
        // console.log(data)
        if(data){
            //except sort
            if(data.sort == undefined){
                let {cat: value} = data
                return BookService.getBooksBy('cat',value)
                .then(response => {
                    commit('SET_ALL_BOOKS', response.data)
                    state.isLoading = false
                    NProgress.done();
                })
                .catch(() => {
                    NProgress.done();
                })
            }
            else {
                let {sort: value} = data
                return BookService.getBooksBy('sort',value)
                .then(response => {
                    commit('SET_ALL_BOOKS', response.data)
                    state.isLoading = false
                    NProgress.done();
                })
                .catch(() => {
                    NProgress.done();
                })
            }
        }
        else {
            return BookService.getBooks()
            .then(response => {
                commit('SET_ALL_BOOKS', response.data)
                state.isLoading = false
                NProgress.done();
            })
            .catch(() => {
                NProgress.done();
            })
        }
    },
    fetchSearchBooks({commit,state},{query,value}){
        state.isLoading = true
        NProgress.start()
        return BookService.getBooksBy(query, value)
            .then(response => {
                commit('SET_SEARCH_RESULT', response.data)
                //set loader to false so data can appear immediately
                state.isLoading = false
                NProgress.done()
            })
            .catch(() => {
                NProgress.done()
            })
    },
    fetchRecommendationBooks({commit}){
        return BookService.getRecommendationBooks()
            .then(response => {
                commit('SET_RECOMMENDATION_BOOKS',response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchRelatedBooks({commit}){
        return BookService.getBooks()
            .then(response => {
                commit('SET_RELATED_BOOKS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchBooks({commit}){
        return BookService.getBooks()
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
    fetchBooksByMax({commit,state},{query,value,max,take}){
        return BookService.getBooksMax(query, value,max,take)
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
        state.isLoading = true
        NProgress.start()
        return BookService.getBook(slug)
            .then(response => {
                //commiting data to state and return it to router index
                commit('SET_BOOK', response.data.data)
                state.isLoading = false
                commit('transaction/SET_TEXT',null,{ root: true })
                commit('transaction/SET_SNACKBAR',false,{ root: true })
                NProgress.done()
                dispatch('fetchRelatedBooks')
            })
    }
}

export const getters = {
    getBooks: state => {
        return state.books
    },
    getLinkServer : state => {
        return state.linkServer
    },
    getCategories: state => {
        let cat = state.categories.data
        let textCat = cat.map(item => item.name);
        return textCat
    }
}