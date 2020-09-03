import AuthService from "@/services/AuthService.js"

export const namespaced = true

export const state = {
    error : null,

    //status 500 unique email
    //status 200 sukses
    //status 422 confirm password does not match
    status: null
}

export const mutations = {
    SET_USER_DATA(state,data){
        //save user data to localstorage
        localStorage.setItem('user',JSON.stringify(data.user))
        localStorage.setItem('usacco',data.access_token)
    },
    SET_USER_ERROR_NOTIF(state,error){
        state.error = error
    },
    SET_STATUS_CODE(state,status){
        state.status = status
    }
}

export const actions = {
    fetchRegister({commit},credential){
        return AuthService.getRegister(credential)
            .then(response => {
                commit('SET_USER_DATA',response.data)
                commit('SET_STATUS_CODE',200)
            })
            .catch(error => {
                commit('SET_USER_ERROR_NOTIF',error.response)
                commit('SET_STATUS_CODE',error.response.status)
            })
    },
    fetchLogin({commit},credential){
        return AuthService.getLogin(credential)
            .then(response => {
                commit('SET_USER_DATA',response.data)
            })
            .catch(error => {
                commit('SET_USER_ERROR_NOTIF',error.response.data.errors)
            })
    }
    
}

export const getters = {

}