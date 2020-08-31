import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
                "Content-Type" : "application/json"
    },
    timeout: 15000
})

export default {
    getRegister(credential){
        return apiClient.post('/api/register',credential)
    },
}