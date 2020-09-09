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
    },
    SET_STATUS_CODE(state,status){
        state.status = status
    },
    SET_LOCAL_STORAGE(state,data){
        state.userData = data
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
    }
}