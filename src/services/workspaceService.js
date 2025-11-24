import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

export async function getWorkspaces () {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    )
    const response = await response_http.json()
    if(!response.ok){
        throw new Error('Error al obtener lista de workspaces')
    }
    return response
}

export async function createWorkspace(workspace_name, url_image) {
    try {
        const workspaceData = {
            name: workspace_name,
            url_image: url_image || null
        }
        
        console.log('Enviando datos al backend:', workspaceData);

        const response_http = await fetch(
            ENVIRONMENT.URL_API + '/api/workspace/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
                },
                body: JSON.stringify(workspaceData)
            }
        )
        
        const response = await response_http.json()
        
        if(!response_http.ok){
            throw new Error(response.message || 'Error al crear el workspace')
        }
        return response
    } catch (error) {
        console.error('Error en createWorkspace:', error)
        throw error
    }
}

export async function inviteToWorkspace(workspace_id, email_invited, role_invited = 'user') {
    const response = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/invite`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({
                email_invited: email_invited,
                role_invited: role_invited
            })
        }
    )
    
    const data = await response.json()
    
    if (!response.ok) {
        throw new Error(data.message || 'Error al invitar')
    }
    
    return data
}

export async function deleteWorkspace(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}`,
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