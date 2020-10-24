/* eslint-disable */
import UserService from "@/services/UserService.js"
import NProgress from 'nprogress';

function sortZtoA(base){
    let sorted = base.sort((a,b) => b.stated - a.stated)

    return sorted
}

function getDetailsBook(trx){
    //filtering data with history state
    let history = trx.filter(el => {
        return el.stated == 6
    })

    //loop details transaction
    let details = history.map(item => item.transaction_details);

    return details
}

// function getDetailsBook(trx) {
//     let temp;
//     for(i = 0; i < trx.length ; i++){
//         for(j = 0; j < trx[i].length; j++){
//             temp.push(trx[i][j])
//         }
//     }
//     return temp;
// }

function getProcess(base){

    //filtering by state
    //using filter will return a new array based on filter
    let waited = base.filter(el => {
        return el.stated == 1
    })

    let accept = base.filter(el => {
        return el.stated == 2
    })

    let reject= base.filter(el => {
        return el.stated == 3
    })

    let ready = base.filter(el => {
        return el.stated == 4
    })

    //concat it
    let final = waited.concat(accept,reject,ready)

    let sorted = sortZtoA(final)

    return sorted
}

function getBorrow(base){
    let borrowed = base.filter(el => {
        return el.stated == 5
    })

    let sorted = sortZtoA(borrowed)

    return sorted
}

function getHistory(base){
    let history = base.filter(el => {
        return el.stated == 6
    })

    let archive = base.filter(el => {
        return el.stated == 7
    })

    //concat it
    let final = history.concat(archive)

    let sorted = sortZtoA(final)

    return sorted
}


export const namespaced = true

export const state = {
    userData: null,
    status: 0,
    isLoading: true,
    transactionsInProcess: null,
    transactionsInBorrow: null,
    transactionsInHistory: null,
    image: null,
    loadingImage: false,
    detailsBook: [],
    statistic : [],
    review : [],
    unreview : [],
}

export const mutations = {
    SET_REVIEW(state,data){
        state.review = data
    },
    SET_UNREVIEW(state,data){
        state.unreview = data
    },
    SET_DETAILS_BOOK(state,data){
        state.detailsBook = data
    },
    SET_TRANSACTIONS_PROCESS(state,data){
        state.transactionsInProcess = data
        localStorage.setItem('process',JSON.stringify(data))
    },
    SET_TRANSACTIONS_BORROW(state,data){
        state.transactionsInBorrow = data
        localStorage.setItem('borrow',JSON.stringify(data))
    },
    SET_TRANSACTIONS_HISTORY(state,data){
        state.transactionsInHistory = data
        localStorage.setItem('history',JSON.stringify(data))
    },
    SET_USER_DATA(state, data){
        state.userData = data

        //set to local storage overriding previos on login
        localStorage.setItem("user",JSON.stringify(data))
    },
    SET_STATUS_CODE(state,status){
        state.status = status
    },
    SET_LOCAL_STORAGE(state,data){
        state.userData = data
    },
    SET_STATISTIC(state,data){
        state.statistic = data
    },

    //for profile-form
    updateAddress(state,data){
        state.userData.details.address = data
    },
    updatePhoneNumber(state,data){
        state.userData.details.phone_number = data
    },
    updateDateOfBirth(state,data){
        state.userData.details.date_of_birth = data
    },
    updateDateOfBaptism(state,data){
        state.userData.details.date_of_baptism = data
    },
    updateGender(state,data){
        state.userData.details.gender = data
    },
    updateMemberCode(state,data){
        state.userData.details.no_cst = data
    },
    updateImage(state,data){
        state.image = data
    }
}

export const actions = {
    fetchUser({commit,dispatch,state}){
        NProgress.start()
        return UserService.getUser()
            .then(response => {
                let userData = response.data.data
                if(userData.length != 0){
                    commit('SET_USER_DATA', response.data.data)
                    commit('SET_STATUS_CODE', response.status)

                    let base = state.userData.transactions 

                    let process = getProcess(base)
                    let borrow = getBorrow(base)
                    let history = getHistory(base) 

                    commit('SET_TRANSACTIONS_PROCESS',process)
                    commit('SET_TRANSACTIONS_BORROW',borrow)
                    commit('SET_TRANSACTIONS_HISTORY',history)

                    let details = getDetailsBook(state.transactionsInHistory);

                    commit('SET_DETAILS_BOOK',details)
                    console.log(state.detailsBook);

                    dispatch('message/fetchMessages',null,{root:true})
                }
                state.isLoading = false
                NProgress.done()
            })
            .catch(() => {NProgress.done()})
    },
    fetchProfile({state}){
        return UserService.getProfile(state.userData.details)
            .then(() => {})
            .catch(error => {console.log(error)})
    },
    fetchStatistic({commit}){
        state.isLoading = true;
        return UserService.getStatistic()
            .then(response => {
                state.isLoading = false
                commit('SET_STATISTIC',response.data.data)
            })
            .catch(() => {
                state.isLoading = false
                NProgress.done()
            })
    },
    fetchImage({commit,state},data){
        state.loadingImage = true
        commit('updateImage',data);
        return UserService.postImage(state.image)
            .then(()=>{state.loadingImage = false})
            .catch(error => {console.log(error)})
    },
    fetchSubmission({state}){
        //0 belum verifikasi
        //1 sedang pengajuan verifikasi
        //2 sukses verifikasi
        return UserService.setSubmission({submission: 1})
                .then((response) => {console.log(response)})
                .catch(error => {console.log(error)})
    },
    submitReview({commit},reviewData){
        NProgress.start();
        
        //change key of previous object
        reviewData.rating = parseInt(reviewData[0])
        reviewData.comment = reviewData[1]

        //delete previous key
        delete reviewData[0]
        delete reviewData[1]
                        
        return UserService.postReview(reviewData)
                .then(response => {
                    console.log(response)
                    NProgress.done()
                    commit('SET_STATUS_CODE',200);
                })
                .catch(error => {
                    console.log(error)
                    NProgress.done()
                })
    },
    processDeleteReview({commit},data){
        console.log(data)
        return UserService.destroyReview(data)
                .then(response => console.log(response))
    },
    fetchReview({commit}){
        state.isLoading = true;
        return UserService.getReview()
                .then(response => {
                    // console.log(response.data.data)
                    commit('SET_REVIEW',response.data.data)
                    state.isLoading = false
                })
                .catch(()=> {
                    state.isLoading = false
                })
    },
    fetchUnreview({commit}){
        state.isLoading = true;
        return UserService.getUnreview()
                .then(response => {
                    commit('SET_UNREVIEW',response.data.data)
                    state.isLoading = false
                })
                .catch(()=> {
                    state.isLoading = false
                })
    }
}

export const getters = {
    getTransactions : state => {
        return state.userData.transactions
    },
    getProgressValue: state => {
        let baseState = 50
        let inc = 10

        if(state.userData.details.address){
            baseState += inc
        }
        if(state.userData.details.date_of_birth){
            baseState += inc
        }
        if(state.userData.details.gender){
            baseState += inc
        }
        if(state.userData.details.phone_number){
            baseState += inc
        }
        if(state.userData.details.no_cst){
            baseState += 5
        }
        if(state.userData.details.is_verified == 1){
            baseState += 5
        }

        return baseState + "%"
    },
    getImage : state => {
        return state.userData.details.image;
    },
    getName : state => {
        return state.userData.name;
    },
    getHistory : state => {
        let data = state.statistic
        let history = data.filter(item => item.state == 6)

        return history
    },
    getTotal : state => {
        return state.statistic
    },
    getBorrow : state => {
        let data = state.statistic
        let borrow = data.filter(item => item.state == 5)

        return borrow
    }
}