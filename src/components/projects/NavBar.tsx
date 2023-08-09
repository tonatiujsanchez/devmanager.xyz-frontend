import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from '@reduxjs/toolkit'

import { IRootState } from "../../store/store"

import { IAuthState } from "../../store/auth"
import { toggleSideMenu } from "../../store/ui"


export const NavBar = () => {

    const  dispatch:Dispatch = useDispatch()
    const { name }: IAuthState = useSelector(( state: IRootState ) => state.auth)

    return (
        <header className="flex justify-between items-center bg-white py-3 px-5 shadow">
            <button
                onClick={ ()=> dispatch( toggleSideMenu() ) } 
                className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-md px-1 active:scale-95"
            >
                <i className='bx bx-menu text-2xl'></i>
            </button>
            <p className="text-slate-700 font-semibold">
                { name }
            </p>
        </header>
    )
}
