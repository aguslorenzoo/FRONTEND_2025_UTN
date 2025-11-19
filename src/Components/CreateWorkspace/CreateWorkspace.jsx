import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import { createWorkspace } from '../../services/workspaceService.js';
import './CreateWorkspace.css';

const CreateWorkspace = ({ isOpen, onClose, onWorkspaceCreated }) => {
    const [workspaceName, setWorkspaceName] = useState('');
    const { loading, error, sendRequest } = useFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!workspaceName.trim()) return;

        try {
            await sendRequest(async () => await createWorkspace({
                workspace_name: workspaceName.trim()
            }));
            setWorkspaceName('');
            onWorkspaceCreated(); // Recargar la lista
            onClose(); // Cerrar modal
        } catch (err) {
            console.error('Error creando workspace:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Crear nuevo workspace</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nombre del workspace</label>
                        <input
                            type="text"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            placeholder="Ingresa el nombre..."
                            autoFocus
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading || !workspaceName.trim()} className="create-btn">
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkspace