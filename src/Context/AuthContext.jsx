import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useJwt, decodeToken } from "react-jwt";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const navigate = useNavigate()
    //datos de sesion
    const [user, setUser] = useState(null)
    //marca si esta o no logueado el usuario
    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('auth_token')))
    
    

    //una vez se monte el componente decodificar el token y guardar los datos de sesion
    useEffect(
        () => {
            const user = decodeToken(localStorage.getItem('auth_token'))
            if(user){
                setUser(user)
                setIsLogged(true)
            }
            else{
                setIsLogged(false)
                setUser(null)
            }
        },
        []
    )
    function onLogout() {
        localStorage.removeItem('auth_token')
        setIsLogged(false)
        setUser(null)
        navigate('/login')
    }

    function onLogin(auth_token){
        localStorage.setItem('auth_token', auth_token)
        setIsLogged(true)
        const user_session = decodeToken(auth_token)
        setUser(user_session)
        navigate('/home')
    }



    return <AuthContext.Provider
        value={{
            isLogged,
            user,
            onLogin,
            onLogout   
        }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider