/* eslint-disable */
import AuthService from '@/services/AuthService.js'
import router from '@/router'

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
    fetchForgot({commit},data){
        // console.log(data);
        return AuthService.getForgot(data)
            .then(response => {
                console.log(response.status)
            })
            .catch(error => {
                console.log(error.response.status)
            })
    },
    fetchReset({commit},data){
        return AuthService.getReset(data)
            .then(response => {

            })
            .catch(error => {
                
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