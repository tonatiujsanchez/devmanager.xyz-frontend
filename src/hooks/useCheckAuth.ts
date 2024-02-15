import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { IAppDispatch, IRootState } from "../store/store"
import { IAuthState, login, startLogout } from "../store/auth"

import { clientAxios } from "../config"
import { getSessionToken, setSessionToken } from "../helpers"





export const useCheckAuth = () => {

    const dispatch:IAppDispatch = useDispatch()
    const { status, name }: IAuthState = useSelector(( state: IRootState ) => state.auth)


    const onCheckAuth = async() => {

        const { token, remindme } = getSessionToken()

        if( !token ){
            return dispatch( startLogout() )
        }

        try {
            const { data } = await clientAxios.get('/users/perfil')

            setSessionToken(data.token, remindme)

            dispatch( login(data.user) )
            
        } catch (error) {
            dispatch( startLogout() )
        }
    }

    useEffect(()=>{
        onCheckAuth()
    },[])


    return { status, name }
}
