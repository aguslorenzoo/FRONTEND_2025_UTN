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
     console.log('🔍 DEBUG createChannel:');
    console.log('🔍 workspace_id:', workspace_id);
    console.log('🔍 channel_name:', channel_name);
    console.log('🔍 Token:', localStorage.getItem(AUTH_TOKEN_KEY));
    console.log('🔍 URL:', ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`);
    
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
    
    console.log('🔍 Response status:', response_http.status);
    console.log('🔍 Response ok:', response_http.ok);
    
    const response = await response_http.json()
    console.log('🔍 Response data:', response);
    
    if (!response_http.ok) {
        throw new Error(response.message || 'Error al crear el canal')
    }
    return response
}

export { getChannelList, createChannel }