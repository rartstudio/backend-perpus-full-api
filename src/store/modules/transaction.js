//import TransactionService from "@/services/TransactionService.js";

export const namespaced = true

export const state = {
    cart: [],
    maxCart : 2,
    text: null,
    linkServer: 'http://127.0.0.1:8000/'
}

export const mutations = {
    SET_TO_CART(state,data){
        state.cart.push(data)
    },
    SET_LOCAL_STORAGE(state,data){
        state.cart = data
    },
    SET_TO_ARRAY(state,data){
        state.cart = data
    },
    SET_TO_NULL(state){
        state.cart = null
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
            //check state maxCart
            if(state.cart.length < state.maxCart){
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
            else{
                state.text = 'Maksimal peminjaman hanya '+ state.cart.length + ' buku'
            }
        }
    },
    deleteFromCart({commit,state},id){
        //find index of array want to delete
        let cartIndex = state.cart.findIndex(element => {
            return element.id == id
        })

        //check cartIndex if -1 dont find the index
        if(cartIndex !== -1){
            //delete it (it always 1 because you want to delete just one)
            state.cart.splice(cartIndex,1);
            //save it to const for temporary
            const tempCart = state.cart
            //set cart to null first
            commit('SET_TO_NULL')
            //set it to array again with data
            commit('SET_TO_ARRAY',tempCart)
            //set it to local storage
            localStorage.setItem('book-cart',JSON.stringify(state.cart))
        }
    },
    checkoutItem(userVerified){
        if(userVerified == 1 ){
            console.log('sukses')
        }
        else{
            state.text = "Untuk meminjam harus memasukkan nomor member gereja terlebih dahulu"
            console.log('gagal')
        }
    }
}

export const getters = {
    getCartLength: state => {
        return state.cart.length
    }
}