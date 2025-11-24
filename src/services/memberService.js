import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

export async function getCurrentMemberId(workspace_id) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.URL_API + `/api/workspace/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
                }
            }
        )
        
        const response = await response_http.json()
        
        if(!response_http.ok){
            throw new Error('Error al obtener member_id')
        }
        

        if (response.data.workspaces && response.data.workspaces[0]) {
            return response.data.workspaces[0].member_id;
        }
        
        throw new Error('No se encontró member_id');
        
    } catch (error) {
        console.error('Error en getCurrentMemberId:', error);
        throw error;
    }
}