import BookService from '@/services/BooksService.js'

export const namespaced = true

export const state = {
    books: [],
    book: {}
}

export const mutations = {
    SET_BOOKS(state, books){
        state.books = books
    },
    SET_BOOK(state,book){
        state.book = book
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
    },
    getBooksRating: state => {
        let data = state.books.book.reviews;
        let rating = 0;
        let final = 0;

        for(var i = 0; i < data.length; i++){
          rating += parseInt(data[i].rating)
        }
        
        if(rating == 0){
          final = 0;
        }
        else {
          final = Math.round(rating/data.length) 
        }

        return final 
      }
}