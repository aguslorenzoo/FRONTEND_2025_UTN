import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

export async function getCurrentMemberId(workspace_id) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/current-member`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
                }
            }
        )
        
        const response = await response_http.json()
        
        if(!response_http.ok){
            throw new Error('Error al obtener member_id: ' + (response.message || response_http.status))
        }
        
        if (response.data && response.data.member_id) {
            return response.data.member_id;
        }

        throw new Error('Estructura de respuesta inesperada')
        
    } catch (error) {
        console.error('Error en getCurrentMemberId:', error)
        throw error;
    }
}