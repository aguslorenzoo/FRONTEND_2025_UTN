import ENVIRONMENT from "../config/environment.js"
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

async function getChannelList (workspace_id){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            },
        }
    );
    const response = await response_http.json()
    if (!response.ok){
        throw new Error('Error al obtener los canales')
    }
    return response
}


async function createChannel(workspace_id, channel_name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({
                name: channel_name
            })
        }
    )  
    const response = await response_http.json()  
    if (!response_http.ok) {
        throw new Error(response.message || 'Error al crear el canal')
    }
    return response
}

async function deleteChannel (workspace_id, channel_id){
    const response_http = await fetch (
        ENVIRONMENT.URL_API + `/api/workspace/:workspace_id/channels/:channel_id`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    )
    const response = await response_http.json()
    
    if(!response_http.ok){
        throw new Error(response.message || 'Error al eliminar el workspace')
    }
    return response
}

export { getChannelList, createChannel, deleteChannel }