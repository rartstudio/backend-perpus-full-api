/* eslint-disable */
// import axios from "axios"

// const apiClient = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     withCredentials: false,
//     headers: {
//         Accept: 'application/json',
//                 'Content-Type' : 'application/json'
//     },
//     timeout: 15000
// })

import {apiClient} from '@/services/ConfigService.js'

export default {
    getBooks(){
        return apiClient.get('/api/book')
    },
    getBooksBy(query, value){
        return apiClient.get(`/api/book?${query}=${value}`)
    },
    getBook(slug){
        return apiClient.get(`/api/book/${slug}`)
    },
    getRecommendationBooks(){
        return apiClient.get('api/recommendation-books')
    }
}