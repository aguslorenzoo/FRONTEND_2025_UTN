import React, { useState } from 'react';
import { deleteChannel } from '../../services/channelService.js';
import "./DeleteChannel.css"

const DeleteChannel = ({ isOpen, onClose, channel, workspace_id, onChannelDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        setLoading(true)
        setError('')
        try {
            await deleteChannel(workspace_id, channel._id)
            onChannelDeleted()
            onClose()
        } catch (err) {
            setError(err.message)
            console.error('Error eliminando el canal:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Eliminar Canal</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="delete-warning">
                    <p>¿Estás seguro de que quieres eliminar el canal <strong>"{channel.name}"</strong>?</p>
                    <p className="warning-text">Esta acción no se puede deshacer. Se eliminarán todos los mensajes.</p>
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

export default DeleteChannel