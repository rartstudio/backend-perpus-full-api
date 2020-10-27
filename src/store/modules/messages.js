/* eslint-disable */
import MessageService from "@/services/MessagesService.js"
import NProgress from 'nprogress';

export const namespaced = true

export const state = {
    messages: [],
    status : null
}

export const mutations = {
    SET_MESSAGES(state,data){
        state.messages = data
    },
    SET_STATUS(state,data){
        state.status = data
    }
}

export const actions = {
    fetchMessages({commit}){
        NProgress.start()
        return MessageService.getMessages()
            .then(response => {
                commit('SET_MESSAGES',response.data.data)
                NProgress.done()
            })
            .catch(()=> {NProgress.done()})
    },
    readMessage({commit}, id){
        return MessageService.postReadMessage(id)
            .then(response => {
               commit('SET_STATUS',response.status)
            })
            .catch()
    }
}

export const getters = {
    getNotRead : state => {
        let notReadMessage = state.messages.filter(message => message.is_read == 0)
        return notReadMessage.length
    }
}