import {apiClient} from '@/services/ConfigService.js';

export default {
    postCartItem(userData){
        return apiClient.post(`/api/transaction`,userData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    },
    postProcessBorrow(id){
        return apiClient.post(`/api/transaction-borrow/${id}`,id,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}

