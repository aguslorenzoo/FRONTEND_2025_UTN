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
        
        console.log("Response status:", response_http.status); // Debug
        
        const response = await response_http.json()
        
        console.log("Response completa:", response); // Debug
        
        if(!response_http.ok){
            throw new Error('Error al obtener member_id: ' + (response.message || response_http.status))
        }
        
        // CORRECCIÓN: La nueva API devuelve los datos directamente en data
        if (response.data && response.data.member_id) {
            return response.data.member_id;
        }
        
        // Si la estructura es diferente, debuggeamos:
        console.log("Estructura inesperada:", response);
        throw new Error('Estructura de respuesta inesperada');
        
    } catch (error) {
        console.error('Error en getCurrentMemberId:', error);
        throw error;
    }
}