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
    relatedBooks: [],
    searchResult: [],
    recommendationBooks: [],
    book: {},
    isLoading: true,
    skeletonCount: 4,
    linkServer: 'https://perpustest.xyz/'
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
    },
    SET_ON_PAGE(state,data){
        state.onPage = data
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
            .catch()
    },
    fetchPerPage({commit}, data){
        state.isLoading = true;
        let {page: value} = data;
        NProgress.start()
        
        if (data.sort != undefined){
            let {sort: by} = data;
            
            return BookService.getBooksByPage('sort',by,'page',value)
                .then(response => {
                    commit('SET_ALL_BOOKS', response.data);
                    state.isLoading = false;
                    NProgress.done();
                })
                .catch(()=> {
                    NProgress.done()
                })
            
        }
        else if (data.cat != undefined){
            let {cat : by} = data;
            
            return BookService.getBooksByPage('cat',by,'page',value)
                .then(response => {
                    commit('SET_ALL_BOOKS',response.data);
                    state.isLoading = false;
                    NProgress.done();
                })
        }
        else {
            return BookService.getBooksPage('page',value)
                .then(response => {
                    commit('SET_ALL_BOOKS',response.data);
                    state.isLoading = false;
                    NProgress.done();
                })
                .catch(()=> {
                    NProgress.done()
                })
        }
    },
    fetchAllBooks({commit},data){
        state.isLoading = true
        NProgress.start()

        //except sort
        if(data){
            if(data.sort != undefined){
                let {sort: value} = data;
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
            if(data.cat != undefined){
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
    fetchSearchBooks({commit,state},data){
        state.isLoading = true
        let { page : by} = data;
        NProgress.start()

        if(by != undefined){
            let {query : q} = data
            let {value : v} = data
            return BookService.getBooksByPage(q, v, 'page', by)
                .then(response => {
                    commit('SET_SEARCH_RESULT', response.data)
                    //set loader to false so data can appear immediately
                    state.isLoading = false
                    NProgress.done()
                })
                .catch(() => {
                    NProgress.done()
                })
        }
        else {
            let {query : q} = data
            let {value : v} = data
            return BookService.getBooksBy(q, v)
                .then(response => {
                    commit('SET_SEARCH_RESULT', response.data)
                    //set loader to false so data can appear immediately
                    state.isLoading = false
                    NProgress.done()
                })
                .catch(() => {
                    NProgress.done()
                })
        }
    },
    fetchRecommendationBooks({commit}){
        return BookService.getRecommendationBooks()
            .then(response => {
                commit('SET_RECOMMENDATION_BOOKS',response.data)
            })
            .catch()
    },
    fetchRelatedBooks({commit}){
        return BookService.getBooks()
            .then(response => {
                commit('SET_RELATED_BOOKS', response.data)
            })
            .catch()
    },
    fetchBooks({commit}){
        return BookService.getBooks()
            .then(response => {
                commit('SET_BOOKS', response.data)
            })
            .catch(()=> {NProgress.done()})
    },
    fetchBooksBy({commit,state},{query,value}){
        return BookService.getBooksBy(query, value)
            .then(response => {
                commit('SET_BOOKS_BY_ONE', response.data)
                //set loader to false so data can appear immediately
                state.isLoading = false
            })
            .catch()
    },
    fetchBooksByMax({commit,state},{query,value,max,take}){
        return BookService.getBooksMax(query, value,max,take)
            .then(response => {
                commit('SET_BOOKS_BY_ONE', response.data)
                //set loader to false so data can appear immediately
                state.isLoading = false
            })
            .catch()
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
            .catch(()=> {NProgress.done()})
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
    },
    
}