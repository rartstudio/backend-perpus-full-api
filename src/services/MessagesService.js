import {apiClient} from '@/services/ConfigService.js';

export default {
    getMessages(){
        return apiClient.get(`/api/user/messages`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    },
    postReadMessage(id, isRead = 1){
        return apiClient.post(`/api/user/messages/${id}`,isRead,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}

