/* eslint-disable */
// import axios from "axios"

import {apiClient} from '@/services/ConfigService.js'

// const apiClient = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     withCredentials: false,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type' : 'application/json',
//     },
//     timeout: 15000
// })

export default {
    getUser(){
        return apiClient.get('/api/user',{headers: {
            'Authorization': `Bearer ${localStorage.getItem("usacco")}`
          }});
    },
    getProfile(userData){
        return apiClient.post(`/api/user`,userData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    },
    setSubmission(submission){
        return apiClient.post(`/api/user/submission`,submission,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        });
    }
}