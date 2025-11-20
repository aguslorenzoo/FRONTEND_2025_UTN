import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

export async function getMessagesByChannelId (workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }   
    )
    const response = response_http.json()
    if (!response.ok){
        throw new Error('Error al obtener los mensajes')
    }
    return response
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