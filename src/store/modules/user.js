/* eslint-disable */
import UserService from "@/services/UserService.js"

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

    return final
}

function getBorrow(base){
    let borrowed = base.filter(el => {
        return el.stated == 5
    })

    return borrowed
}

function getHistory(base){
    let history = base.filter(el => {
        return el.stated == 6
    })

    return history
}

export const namespaced = true

export const state = {
    userData: null,
    status: 0,
    isLoading: true,
    transactionsInProcess: null,
    transactionsInBorrow: null,
    transactionsInHistory: null,
}

export const mutations = {
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
    updateAddress(state,data){
        state.userData.details.address = data
    },
    updatePhoneNumber(state,data){
        state.userData.details.phone_number = data
    },
    updateDateOfBirth(state,data){
        state.userData.details.date_of_birth = data
    },
    updateGender(state,data){
        state.userData.details.gender = data
    },
    updateMemberCode(state,data){
        state.userData.details.no_cst = data
    }
}

export const actions = {
    fetchUser({commit,state}){
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

                }
                state.isLoading = false
            })
            .catch()
    },
    fetchProfile({state},slug){
        console.log(state.userData.details)
        return UserService.getProfile(state.userData.details,slug)
            .then(response => {
                console.log(response)
            })
            .catch(error => {console.log(error)})
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
    }
}