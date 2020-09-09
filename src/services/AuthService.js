/* eslint-disable */
// import axios from "axios"

// const apiClient = axios.create({
//     baseURL: "http://127.0.0.1:8000",
//     withCredentials: false,
//     headers: {
//         Accept: "application/json",
//                 "Content-Type" : "application/json"
//     },
//     timeout: 15000
// })

import {apiClient} from '@/services/ConfigService.js'

export default {
    getRegister(credential){
        return apiClient.post('/api/register',credential)
    },
    getLogin(credential){
        return apiClient.post('/api/login',credential)
    },
    getLogout(){
        return apiClient.post('/api/logout',[],{
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}