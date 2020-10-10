import {apiClient} from '@/services/ConfigService.js';

export default {
    postCartItem(userData){
        return apiClient.post(`/api/transaction`,userData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    },
    postProcessBorrow(id,stock){
        // console.log(id);
        // console.log(stock);
        return apiClient.post(`/api/transaction-borrow/${id}`,stock,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}

