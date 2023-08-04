
import axios from "axios"
import { getSessionToken } from "../helpers"


const { token } = getSessionToken()

export const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
})