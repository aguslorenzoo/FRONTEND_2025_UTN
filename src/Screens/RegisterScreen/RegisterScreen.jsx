import React, { useState } from "react";
import useForm from "../../hooks/useForm.jsx";
import { register } from "../../services/authService.js";
import useFetch from "../../hooks/useFetch.jsx";
import "./RegisterScreen.css";

const RegisterScreen = () =>{
    // guardamos los campos que tendra nuestro form
    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }
    
    //creamos estado inicial del form
    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }

    // ESTADOS PARA MANEJAR UNA CONSULTA DEL SERVIDOR
    const {response, error, loading, sendRequest, resetResponse} =  useFetch()

    function onRegister (form_state_sent) {
        resetResponse()
        sendRequest(
            () => {
                return register(
                    form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                    form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                    form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
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
        onRegister
    )

    console.log(response)

    return (
        <div className="container">
            <div className="register-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <h1>Registrate</h1> 
                    <div className="form-content">
                        <div className="form-field">
                            <label htmlFor="username" className="form-field-title">Nombre de usuario: </label>
                            <input 
                                className="form-field-content"
                                type="text" 
                                placeholder="pepe" 
                                value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                                name={REGISTER_FORM_FIELDS.USERNAME}
                                id='username'
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="email" className="form-field-title">Email: </label>
                            <input 
                                className="form-field-content"
                                type="text" 
                                placeholder="pepe@mail.com" 
                                value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                                name={REGISTER_FORM_FIELDS.EMAIL}
                                id={'email'}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password" className="form-field-title">Contraseña: </label>
                            <input  
                                className="form-field-content"
                                type="text" 
                                placeholder="Pepe-123" 
                                value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                                name={REGISTER_FORM_FIELDS.PASSWORD}
                                id={'password'}
                                onChange={onInputChange}
                            />
                        </div>
                        {error && <span style={{color: 'red'}}> {error} </span>}
                        {response && <span style={{color: 'green'}}>Usuario registrado con exito, por favor verifique su email </span>}
                        {
                            loading
                            ? <button disabled>Registrando</button>
                            : <button>Registrarse</button>
                        }
                     </div>
                </form>   
            </div>
        </div>
    )
}

export default RegisterScreen