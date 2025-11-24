import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

export async function getMessagesByChannelId (workspace_id, channel_id) {
    try{
        const response_http = await fetch(
            ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
                }
            }   
        )
        const response = await response_http.json()
        if (!response_http.ok){
            throw new Error('Error al obtener los mensajes')
        }
        return response
    } catch (error){
        console.error('No se pudo obtener la lista de mensajes', error)
        throw error
    }
}

export async function createChannel(workspace_id, name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({
                name: name
            })
        }
    )
    
    const response = await response_http.json()
    if(!response.ok){
        throw new Error(response.message || 'Error al crear el canal')
    }
    return response
}

export async function sendMessage (workspace_id, channel_id, message_content){
    try{
        const response_http = await fetch(
            ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
                },
                body: JSON.stringify(
                    {
                        content: message_content
                    }
                )
            }   
        )
        const response = await response_http.json()
        if (!response_http.ok) {
            throw new Error(response.message || 'Error al enviar el mensaje');
        }
        
        return response
    }
    catch(error){
        console.error('No se pudo enviar el mensaje', error)
        throw error
    }
}