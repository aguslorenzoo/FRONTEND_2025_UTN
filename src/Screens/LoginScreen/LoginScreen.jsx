import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import { login } from "../../services/authService";
import { AuthContext } from "../../Context/AuthContext";
import "./LoginScreen.css";
 
const LoginScreen = () =>{
    const navigate = useNavigate()
    const location = useLocation()
    const {onLogin} = useContext(AuthContext)

    useEffect(
        () => {
            const query = new URLSearchParams(location.search)
            console.log(query)
            const from = query.get('from')
            if (from && from === 'verified_email'){
                alert('Has validado tu email exitosamente')
            }
        },
        [] 
    )
    

    const LOGIN_FORM_FIELD = {
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state = {
        [LOGIN_FORM_FIELD.EMAIL]: '',
        [LOGIN_FORM_FIELD.PASSWORD]: ''
    }

    const {response, error, loading, sendRequest, resetResponse} =  useFetch()

    function handleLogin (form_state_sent) {
        resetResponse()
        sendRequest(
            () => {
                return login(
                    form_state_sent[LOGIN_FORM_FIELD.EMAIL],
                    form_state_sent[LOGIN_FORM_FIELD.PASSWORD]
                )
            }
        )
    }

    const {
        form_state, 
        onInputChange, 
        handleSubmit, 
        resetForm
    } = useForm(
        initial_form_state, 
        handleLogin
    )

    console.log(response)
    
    useEffect(
        () => {
            if(response && response.ok){
                onLogin(response.body.auth_token)
            }
        },
        [response]
    )
    return (
        <div className="container">
            <div className="login-container">
                <form onSubmit={handleSubmit} className="form-container"> 
                    <h1>Bienvenido a Discord Clone</h1>
                    <div className="form-content">
                        <div className="form-field">
                            <label htmlFor="email" className="form-field-title">Email: </label>
                            <input 
                                className="form-field-content"
                                type="text" 
                                placeholder="pepe@mail.com" 
                                value={form_state[LOGIN_FORM_FIELD.EMAIL]}
                                name={LOGIN_FORM_FIELD.EMAIL}
                                id={'email'}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password" className="form-field-title">Contraseña: </label>
                            <input 
                                className="form-field-content"
                                type="text" 
                                placeholder="pepe-123" 
                                value={form_state[LOGIN_FORM_FIELD.PASSWORD]}
                                name={LOGIN_FORM_FIELD.PASSWORD}
                                id={'password'}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="login-message-container">
                            {error && <span className="login-message" style={{color: 'red'}}> {error} </span>}
                            {response && <span className="login-message" style={{color: 'green'}}>Usuario logueado con exito </span>}
                        </div>
                        <div className="button-container">
                            {
                                loading
                                ? <button disabled className="button-loading">Iniciando...</button>
                                : <button className="button">Iniciar sesion</button>
                            }
                        </div>
                        <div className="register-link">
                            <span>¿No tenes una cuenta?</span>
                            <span 
                                className="link-text"
                                onClick={() => navigate('/register')}>
                                Registrate
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen