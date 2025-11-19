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
        throw new Error('Error al crear el workspace')
    }
    return response
}