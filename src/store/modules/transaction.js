import TransactionService from "@/services/TransactionService.js";
import router from "@/router";
import NProgress from 'nprogress';

export const namespaced = true

export const state = {
    cart: [],
    maxCart : 2,
    finalCart: null,
    text: null,
    status: null,
    linkServer: 'https://perpustest.xyz/',
    enabledSnackbar: false,
    trxid: null
}

export const mutations = {
    SET_STATUS(state,data){
        state.status = data
    },
    SET_SNACKBAR(state, data){
        state.enabledSnackbar = data
    },
    SET_TEXT(state,data){
        state.text = data
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
    },
    TRX_ID(state,data){
        state.trxid = data
    }
}

export const actions = {
    sendToCart({commit,state},item){
        //if state.cart still empty
        if(state.cart.length == 0){
            commit('SET_TO_CART',item)
            commit('SET_SNACKBAR',true);
            commit('SET_TEXT','Berhasil ditambahkan ke keranjang') 

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
                    commit('SET_SNACKBAR',true);
                    commit('SET_TEXT','Sudah pernah ditambahkan ke keranjang');
                }
                //if false
                else {
                    commit('SET_TO_CART',item)
                    commit('SET_SNACKBAR',true);
                    commit('SET_TEXT','Berhasil ditambahkan ke keranjang');
                    localStorage.setItem('book-cart',JSON.stringify(state.cart))
                }
            }
            else{
                let text = 'Maksimal peminjaman hanya '+ state.cart.length + ' buku'
                commit('SET_SNACKBAR',true);
                commit('SET_TEXT',text);
            }
        }
    },
    deleteFromCart({commit,state},id){
        //find index of array want to delete
        //if dont find will return -1 
        //if find will return index of array
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
    checkoutItem({state,commit,rootState}){

        //check user data is available
        if(rootState.user.userData){
            //checking if user verified
            if(rootState.user.userData.details.is_verified == 1 ){
                //checking is user transaction process
                if(rootState.user.transactionsInProcess.length == 0){
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
                        commit('SET_SNACKBAR',false);
                    })
                    .catch()    
                }
                else {
                    commit('SET_SNACKBAR',true);
                    commit('SET_TEXT','Selesaikan terlebih dahulu peminjaman buku sebelumnya atau batalkan peminjaman yang sedang proses') 
                }
            }
            else{
                commit('SET_SNACKBAR',true);
                commit('SET_TEXT','Untuk meminjam harus memasukkan nomor member gereja terlebih dahulu dan sudah diverifikasi') 
            }
        }
        else {
            router.push({name: 'login'})
        }
    },
    processBorrow({commit,rootState},trxid){
        commit('TRX_ID',trxid);

        //get transaction in process
        let processTrx = rootState.user.transactionsInProcess
        
        //get choosen trx
        let choosenTrx = processTrx.filter(trx => trx.id == state.trxid);

        //get transaction detail
        let trxDetailsRaw = choosenTrx[0].transaction_details;

        //loop throught it (structure depend on table)
        for(let i = 0; i < trxDetailsRaw.length ; i++){
                        
            //add transaction code
            trxDetailsRaw[i].add_info = choosenTrx[0].transaction_code
            
            //delete key state and id
            delete trxDetailsRaw[i].state
            delete trxDetailsRaw[i].id
            delete trxDetailsRaw[i].details             
        }
        NProgress.start()
        return TransactionService.postProcessBorrow(state.trxid, trxDetailsRaw)
                    .then(()=> {NProgress.done()})
                    .catch(()=> {NProgress.done()})    
    },
    rejectBorrow({commit},data){
        commit('TRX_ID',data.id);
        NProgress.start()
        return TransactionService.rejectBorrow(state.trxid, data)
                    .then(()=> {NProgress.done()})
                    .catch(()=> {NProgress.done()})    
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