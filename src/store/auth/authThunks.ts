import { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

import { clientAxios } from "../../config"
import { login, logout, clearMsgError } from "./authSlice"


interface StartUserWithEmailAndPasswordParams {
    email: string
    password: string
    remindMe: boolean
}

export const startUserWithEmailAndPassword = ({ email, password, remindMe }:StartUserWithEmailAndPasswordParams) => {
    
    return async( dispatch:Dispatch ) => {

        try {

            const { data } = await clientAxios.post('/users/login',{
                email, password
            })

            localStorage.setItem('uptask_session', data.token)
            localStorage.setItem('uptask_remindme', String(remindMe))
            
            dispatch( login( data.user ) )

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                
                dispatch( logout({ msg }) )

                setTimeout(() => {
                    dispatch( clearMsgError() )
                }, 3000);
            }
        }

    }
}

