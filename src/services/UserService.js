/* eslint-disable */
import axios from "axios"

// import {apiClient} from '@/services/ConfigService.js'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json'
    },
    timeout: 15000
})

export default {
    getStatistic(){
        return apiClient.get('/api/user/statistic',{headers: {
            'Authorization': `Bearer ${localStorage.getItem("usacco")}`,
            'Content-Type' : 'application/json',
          }});
    },
    getUser(){
        return apiClient.get('/api/user',{headers: {
            'Authorization': `Bearer ${localStorage.getItem("usacco")}`,
            'Content-Type' : 'application/json',
          }});
    },
    getProfile(userData){
        return apiClient.post(`/api/user`,userData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`,
                'Content-Type' : 'application/json',
            }
        })
    },
    postImage(image){
        return apiClient.post('/api/user/image',image, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    setSubmission(submission){
        return apiClient.post(`/api/user/submission`,submission,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`,
                'Content-Type' : 'application/json',
            }
        });
    }
}