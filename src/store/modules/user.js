import UserService from "@/services/UserService.js"

export const namespaced = true

export const state = {
    userData: null
}

export const mutations = {
    SET_USER_DATA(state, data){
        state.userData = data
    }
}

export const actions = {
    fetchUser({commit}){
        return UserService.getUser()
            .then(response => {
                commit('SET_USER_DATA', response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}