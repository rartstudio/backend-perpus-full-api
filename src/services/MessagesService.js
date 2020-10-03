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