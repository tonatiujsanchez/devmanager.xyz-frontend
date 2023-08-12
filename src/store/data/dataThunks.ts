import { Dispatch } from "@reduxjs/toolkit"

import { isAxiosError } from "axios"
import { clientAxios } from "../../config"

import { refreshProjects } from "./"




interface StartRefreshNotesParams {
    page: number
    count: number
}

export const startRefreshNotes = ({ page=1, count=10 }:StartRefreshNotesParams ) => {

    return async( dispatch:Dispatch ) => {

        try {
            const { data } = await clientAxios.get(`/projects?page=${page}&count=${count}`)
            console.log({data});
            dispatch( refreshProjects( data ) )
            
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
                
            }   
        }

    }
}








