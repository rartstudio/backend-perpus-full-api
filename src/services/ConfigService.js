import axios from "axios"

export const apiClient = axios.create({
    baseURL: 'https://perpustest.xyz/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
    },
    timeout: 15000
})