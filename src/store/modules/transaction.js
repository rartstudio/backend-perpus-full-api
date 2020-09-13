import TransactionService from "@/services/TransactionService.js";

export const namespaced = true

export const state = {
    cart: [],
    maxCart : 2,
    finalCart: null,
    text: null,
    status: null,
    linkServer: 'http://127.0.0.1:8000/'
}

export const mutations = {
    SET_STATUS(state,data){
        state.status = data
    },
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
    },
    SET_FINAL_CART(state,data){
        state.finalCart = data
    }
}

export const actions = {
    sendToCart({commit,state},item){
        //if state.cart still empty
        if(state.cart.length == 0){
            commit('SET_TO_CART',item)
            state.text = 'Berhasil ditambahkan ke keranjang'
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
    checkoutItem({state,commit},userVerified){
        //checking if user verified
        if(userVerified == 1 ){
            //mutation state cart before send it to database
            let tempCart = state.cart
            for(let i = 0; i < tempCart.length ; i++){
                
                //set addition info
                tempCart[i].transaction_id = 1
                
                //replacing key object
                tempCart[i].book_id = tempCart[i].id
                
                //set addition info
                tempCart[i].state = 1
                
                //delete key image and title
                delete tempCart[i].image
                delete tempCart[i].title
                delete tempCart[i].id                
            }

            //set it to final
            commit('SET_FINAL_CART', tempCart)
            //set cart to null first
            commit('SET_TO_NULL')
            //set it to array again with data
            commit('SET_TO_ARRAY',JSON.parse(localStorage.getItem('book-cart')))

            return TransactionService.postCartItem(state.finalCart)
                .then(response => {
                    localStorage.removeItem('book-cart')
                    state.cart = []
                    commit('SET_STATUS',response.status)
                })
                .catch(error => {
                    console.log(error)
                })            
        }
        else{
            state.text = "Untuk meminjam harus memasukkan nomor member gereja terlebih dahulu"
        }
    }
}

export const getters = {
    getCartLength: state => {
        return state.cart.length
    },
    getCart: state => {
        return state.cart
    },
    checkCart: state => {
        if(state.cart.length == 0){
            return true
        }
        else {
            return false
        }
    }
}