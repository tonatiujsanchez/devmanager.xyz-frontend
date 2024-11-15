import { useGoogleLogin } from '@react-oauth/google'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { IAppDispatch } from '../../store/store'
import { startUserWithGoogle } from '../../store/auth'



interface Props {
    loading: boolean
    setLoading: (value: React.SetStateAction<boolean>) => void
    remindMe: boolean
}
export const GoogleLoginButton: FC<Props> = ({ loading, setLoading, remindMe }) => {

    const dispatch: IAppDispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            setLoading(true)
            try {

                await dispatch(startUserWithGoogle({ access_token: response.access_token, remindMe }))

            } catch (error) {
                console.error('Error en la autenticación:', error)
            } finally {
                setLoading(false)
            }
        },
        onError: (error) => console.error('onError => Login Failed:', error)
    })


    return (
        <button
            disabled={loading}
            className="border rounded-md px-2 py-1 enabled:hover:bg-slate-800 enabled:hover:text-white transition-all duration-300 disabled:opacity-50"
            onClick={() => login()}
        >
            <i className='bx bxl-google text-2xl'></i>
        </button>
    )
}
