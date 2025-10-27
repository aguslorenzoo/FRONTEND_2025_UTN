import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import { login } from "../../services/authService";
import { AuthContext } from "../../Context/AuthContext";

const LoginScreen = () =>{
    const navigate = useNavigate()
    const location = useLocation()
    const {onLogin} = useContext(AuthContext)

    useEffect(
        () => {
            //si venimos de verifica el mail, mostrar la alerta de verificado
            const query = new URLSearchParams(location.search)
            console.log(query)
            const from = query.get('from')
            if (from && from === 'verified_email'){
                alert('Has validado tu email exitosamente')
            }
        },
        []// solo queremos que se ejecute cuando se monte el componente
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
                //queremos que persista en memoria el auth token
                onLogin(response.body.auth_token)
            }
        },
        [response]
    )
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}> 
                <h1>Login</h1>
                <div className="form-field">
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="text" 
                        placeholder="pepe@mail.com" 
                        value={form_state[LOGIN_FORM_FIELD.EMAIL]}
                        name={LOGIN_FORM_FIELD.EMAIL}
                        id={'email'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Contraseña: </label>
                    <input 
                        type="text" 
                        placeholder="pepe-123" 
                        value={form_state[LOGIN_FORM_FIELD.PASSWORD]}
                        name={LOGIN_FORM_FIELD.PASSWORD}
                        id={'password'}
                        onChange={onInputChange}
                    />
                </div>
                {error && <span style={{color: 'red'}}> {error} </span>}
                {response && <span style={{color: 'green'}}>Usuario logueado con exito </span>}
                {
                    loading
                    ? <button disabled>Iniciando..</button>
                    : <button>Iniciar sesion</button>
                }
            </form>
        </div>
    )
}

export default LoginScreen