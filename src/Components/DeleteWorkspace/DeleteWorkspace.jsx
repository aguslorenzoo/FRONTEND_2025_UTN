import React, { useState } from 'react';
import { deleteWorkspace } from '../../services/workspaceService.js';
import "./DeleteWorkspace.css"

const DeleteWorkspace = ({ isOpen, onClose, workspace, onWorkspaceDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        setLoading(true)
        setError('')
        
        try {
            await deleteWorkspace(workspace.workspace_id)
            onWorkspaceDeleted()
            onClose()
        } catch (err) {
            setError(err.message)
            console.error('Error eliminando workspace:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Eliminar Workspace</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="delete-warning">
                    <p>¿Estás seguro de que quieres eliminar el workspace <strong>"{workspace.name}"</strong>?</p>
                    <p className="warning-text">Esta acción no se puede deshacer. Se eliminarán todos los canales y mensajes.</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        disabled={loading}
                        className="delete-btn"
                    >
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWorkspace