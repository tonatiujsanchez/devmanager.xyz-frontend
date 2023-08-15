import { Dispatch } from "@reduxjs/toolkit"

import { isAxiosError } from "axios"
import { clientAxios } from "../../config"

import { addNewProject, refreshProjects } from "./"



interface StartRefreshNotesParams {
    page: number
    count: number
}
export const startRefreshNotes = ({ page, count }:StartRefreshNotesParams ) => {

    return async( dispatch:Dispatch ) => {

        try {
            const { data } = await clientAxios.get(`/projects?page=${page}&count=${count}`)
            dispatch( refreshProjects( data ) )
            
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
                
            }   
        }
    }
}


interface StartAddNewProjectParams {
    name        : string
    description : string
    deliveryDate:string
    client      : string
}
export const startAddNewProject = ({ name, description, deliveryDate, client }:StartAddNewProjectParams) => {
    return async( dispatch:Dispatch ) => {

        try {
            const { data } = await clientAxios.post(`/projects`,{
                name, description, deliveryDate, client
            })
            console.log(data)
            
            dispatch( addNewProject(data) )
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            }   
        }

    }
}







