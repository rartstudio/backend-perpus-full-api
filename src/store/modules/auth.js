import AuthService from "@/services/AuthService.js"

export const namespaced = true

export const state = {
    jwtToken: '',
    userData: null,
    error : null
}

export const mutations = {
    SET_USER_DATA(state,data){
        state.userData = data
        
        //save user data to localstorage
        localStorage.setItem('user',JSON.stringify(data))
        
        //get token and parse it to bearer header
        let getToken = localStorage.getItem("access_token")
        AuthService.getBearerToken(getToken);
    },
    SET_USER_ERROR_NOTIF(state,error){
        state.error = error
    }
}

export const actions = {
    fetchRegister({commit},credential){
        return AuthService.getRegister(credential)
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