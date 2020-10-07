import {apiClient} from '@/services/ConfigService.js';

export default {
    getMessages(){
        return apiClient.get(`/api/user/messages`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    },
    postReadMessage(id){
        return apiClient.post(`/api/user/messages/${id}`,id,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("usacco")}`
            }
        })
    }
}

