/* eslint-disable */
import UserService from "@/services/UserService.js"

export const namespaced = true

export const state = {
    userData: null,
    status: 0,
    isLoading: true,
}

export const mutations = {
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
    }
}