import UserService from "@/services/UserService.js"

export const namespaced = true

export const state = {
    userData: null,
    status: 0
}

export const mutations = {
    SET_USER_DATA(state, data){
        state.userData = data
    },
    SET_STATUS_CODE(state,status){
        state.status = status
    }
}

export const actions = {
    fetchUser({commit}){
        return UserService.getUser()
            .then(response => {
                commit('SET_USER_DATA', response.data.data)
                commit('SET_STATUS_CODE', response.status)

                //console.log(response.data)
            })
            .catch()
    }
}