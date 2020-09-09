/* eslint-disable */
import UserService from "@/services/UserService.js"

export const namespaced = true

export const state = {
    userData: null,
    status: 0,
    isLoading: true
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
    fetchProfile(userData,slug){
        return UserService.getProfile(userData,slug)
            .then(response => {
                console.log(response)
            })
            .catch(error => {console.log(error)})
    }
}