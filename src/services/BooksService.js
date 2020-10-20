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
        return apiClient.get(`/api/book`);
    },
    getBooksPage(page,value){
        return apiClient.get(`/api/book?${page}=${value}`)
    },
    getBooksBy(query, value){
        return apiClient.get(`/api/book?${query}=${value}`)
    },
    getBooksMax(query, value, max, take){
        return apiClient.get(`/api/book?${query}=${value}&${max}=${take}`)
    },
    getBook(slug){
        return apiClient.get(`/api/book/${slug}`)
    },
    getRecommendationBooks(){
        return apiClient.get('api/recommendation-books')
    },
    getCategories(){
        return apiClient.get('api/categories-book')
    }
}