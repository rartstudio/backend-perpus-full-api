/* eslint-disable */
import AuthService from '@/services/AuthService.js'
import router from '@/router'

export const namespaced = true

export const state = {
    error : null,
    user : null,
    enabledSnackbar: false,
    //status 500 unique email
    //status 200 sukses
    //status 422 confirm password does not match
    status: null,
    message: null
}

export const mutations = {
    SET_USER_DATA(state,data){
        //save user data to localstorage
        localStorage.setItem('user',JSON.stringify(data.user))
        localStorage.setItem('usacco',data.access_token)
    },
    SET_SNACKBAR(state, data){
        state.enabledSnackbar = data
    },
    SET_USER_ERROR_NOTIF(state,error){
        state.error = error
    },
    SET_STATUS_CODE(state,status){
        state.status = status
    },
    SET_USER(state,data){
        state.user = data
    },
    SET_MESSAGE(state,data){
        state.message = data
    }
}

export const actions = {
    fetchForgot({commit},data){
        return AuthService.getForgot(data)
            .then(response => {
                commit('SET_STATUS_CODE',response.status);
                commit('SET_USER',response.data.data.email);
            })
            .catch(error => {
                commit('SET_STATUS_CODE',error.response.status);
                commit('SET_MESSAGE',error.response.data.message);
            })
    },
    fetchReset({commit},data){
        //add key email from state
        data.email = state.user
        return AuthService.getReset(data)
            .then(response => {
                commit('SET_STATUS_CODE',response.status);
                commit('SET_MESSAGE',response.data.message);
                commit('SET_SNACKBAR',true);
            })
            .catch(error => {
                commit('SET_STATUS_CODE',error.response.status);
                commit('SET_MESSAGE',error.response.data.message);
            })
    },
    fetchRegister({commit},credential){
        return AuthService.getRegister(credential)
            .then(response => {
                const statusCode = 200
                const token = response.data.access_token
                if(token.length != 0 && statusCode.length != 0){
                    commit('SET_USER_DATA',response.data)
                    commit('SET_STATUS_CODE',200)
                }
            })
            .catch(error => {
                commit('SET_USER_ERROR_NOTIF',error.response)
                commit('SET_STATUS_CODE',error.response.status)
            })
    },
    fetchLogin({commit},credential){
        return AuthService.getLogin(credential)
            .then(response => {
                const token = response.data.access_token
                const statusCode = 200
                if(token.length != 0 && statusCode.length != 0){
                    commit('SET_STATUS_CODE',statusCode)
                    commit('SET_USER_DATA',response.data)
                }
            })
            .catch(() => {
                commit('SET_STATUS_CODE',401)
            })
    },
    fetchLogout(){
        return AuthService.getLogout()
            .then(()=>{
                router.push({ name: 'home' })
            })
            .catch(error => {
                
            })
    }
}

export const getters = {

}