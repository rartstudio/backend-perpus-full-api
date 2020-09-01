import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
    },
    timeout: 15000
})

export default {
    getUser(){
        return apiClient.get('/api/user',{headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("usacco")}`
          }});
    }
}