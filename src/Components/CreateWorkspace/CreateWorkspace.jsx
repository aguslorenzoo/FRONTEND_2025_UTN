import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import { createWorkspace } from '../../services/workspaceService.js';
import './CreateWorkspace.css';

const CreateWorkspace = ({ isOpen, onClose, onWorkspaceCreated }) => {
    const [workspaceName, setWorkspaceName] = useState('')
    const [workspaceImageUrl, setWorkspaceImageUrl] = useState('')
    const { loading, error, sendRequest } = useFetch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!workspaceName.trim()) return

        try {
            await sendRequest(async () => await createWorkspace(
                workspaceName.trim(), 
                workspaceImageUrl.trim() || null 
            ))
            setWorkspaceName('')
            setWorkspaceImageUrl('')
            onWorkspaceCreated()
            onClose()
        } catch (err) {
            console.error('Error creando workspace:', err)
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Crear nuevo workspace</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nombre del workspace *</label>
                        <input
                            type="text"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            placeholder="Ingresa el nombre..."
                            autoFocus
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>URL de la imagen (opcional)</label>
                        <input
                            type="url"
                            value={workspaceImageUrl}
                            onChange={(e) => setWorkspaceImageUrl(e.target.value)}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        <small className="help-text">
                            Ingresa la URL de una imagen para tu workspace
                        </small>
                    </div>

                    {workspaceImageUrl && (
                        <div className="image-preview-section">
                            <label>Vista previa:</label>
                            <div className="url-image-preview">
                                <img 
                                    src={workspaceImageUrl} 
                                    alt="Preview" 
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setWorkspaceImageUrl('')}
                                    className="remove-url-btn"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || !workspaceName.trim()} 
                            className="create-btn"
                        >
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspace