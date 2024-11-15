import { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { googleLogout } from '@react-oauth/google'

import { clientAxios } from "../../config"
import { login, logout, clearMsgError } from "./authSlice"
import { clearProjectsLogout } from "../data"

import { setSessionToken } from "../../helpers"


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
            
            await setSessionToken( data.token, remindMe )

            dispatch( login( data.user ) )
            console.log(data)

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


interface StartUserWithGoogle {
    access_token?: string
    remindMe: boolean
}
export const startUserWithGoogle = ({ access_token='', remindMe }:StartUserWithGoogle) => {
    return async( dispatch: Dispatch )=> {

        try {
            
            const { data } = await clientAxios.post('/users/google',{ access_token })
            
            await setSessionToken( data.token, remindMe )
    
            dispatch( login( data.user ) )

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                
                googleLogout()
                dispatch( logout({ msg }) )

                setTimeout(() => {
                    dispatch( clearMsgError() )
                }, 3000);
            }
        }

    }
}

export const startLogout = () => {
        
    return async( dispatch:Dispatch ) => {
        googleLogout()
        dispatch( logout({}) )  
        dispatch( clearProjectsLogout() )
        localStorage.removeItem('uptask_remindme')
        localStorage.removeItem('uptask_session')
        sessionStorage.removeItem('uptask_session')
    }
}