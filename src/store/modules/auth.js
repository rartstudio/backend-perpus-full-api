import AuthService from "@/services/AuthService.js"

export const namespaced = true

export const state = {
    jwtToken: '',
    userData: []
}

export const mutations = {
    SET_USER_DATA(state,data){
        state.userData = data
    }
}

export const actions = {
    fetchRegister({commit},credential){
        return AuthService.getRegister(credential)
            .then(response => {
                commit('SET_USER_DATA',response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}

export const getters = {

}