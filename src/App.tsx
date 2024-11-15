import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store/store'
import { AppRouter } from "./routes"


function App() {

    return (
        <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_CLIENT_ID }>
            <Provider store={store} >
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </Provider>
        </GoogleOAuthProvider>
    )
}

export default App
