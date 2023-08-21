
import axios from "axios"
import { getSessionToken } from "../helpers"



const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
})


clientAxios.interceptors.request.use( ( config )=> {

    const { token } = getSessionToken()

    config.headers['Authorization'] = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'

    return config
})

export {
    clientAxios
}