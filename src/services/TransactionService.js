import {apiClient} from '@/services/ConfigService.js';

export default {
    postCartItem(userData){
        return apiClient.post(`/api/transaction`,userData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}

