import React, { useState, useEffect } from 'react';
import { updateWorkspace } from '../../services/workspaceService.js';
import './EditWorkspaceModal.css';

const EditWorkspaceModal = ({ isOpen, onClose, workspace, onWorkspaceUpdated }) => {
    const [name, setName] = useState('')
    const [url_image, setUrlImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(
        () => {
            if (workspace) {
                setName(workspace.workspace_name || workspace.name || '')
                setUrlImage(workspace.workspace_url_image || workspace.url_image || '')
            }
        }, 
        [workspace]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!name.trim()) {
            setError('El nombre es requerido')
            return
        }

        try {
            setLoading(true)
            setError('')
            
            const workspaceData = {
                name: name.trim(),
                url_image: url_image.trim() || undefined
            }

            await updateWorkspace(workspace.workspace_id || workspace._id, workspaceData)
            
            onWorkspaceUpdated()
            onClose()
        } catch (err) {
            setError(err.message || 'Error al actualizar el workspace')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Editar Workspace</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Workspace</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre del workspace"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="url_image">URL de Imagen (opcional)</label>
                        <input
                            type="url"
                            id="url_image"
                            value={url_image}
                            onChange={(e) => setUrlImage(e.target.value)}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            disabled={loading}
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="cancel-btn"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditWorkspaceModal