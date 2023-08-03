import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { IAuthState, login, logout } from "../store/auth"
import { IAppDispatch, IRootState } from "../store/store"
import { clientAxios } from "../config"





export const useCheckAuth = () => {

    const dispatch:IAppDispatch = useDispatch()
    const { status }: IAuthState = useSelector(( state: IRootState ) => state.auth)


    const onCheckAuth = async() => {

        try {
            const { data } = await clientAxios.get('/users/perfil')
            dispatch( login( data.user ) )
            console.log({data})
            
        } catch (error) {
            dispatch( logout({}) )
        }
    }

    useEffect(()=>{
        onCheckAuth()
    },[])


    return { status }
}
