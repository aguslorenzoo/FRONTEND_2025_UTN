import React, { useState } from 'react';
import { createChannel } from '../../services/channelService.js';
import "./CreateChannelModal.css"

const CreateChannelModal = ({ isOpen, onClose, workspace_id, onChannelCreated }) => {
    const [channelName, setChannelName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!channelName.trim()) return
        
        setLoading(true)
        setError('')
        
        try {
            console.log('Creando canal:', channelName, 'en workspace:', workspace_id)
            await createChannel(workspace_id, channelName.trim())
            setChannelName('')
            onChannelCreated() 
            onClose()
        } catch (err) {
            setError(err.message)
            console.error('Error creando canal:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Crear nuevo canal</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del canal</label>
                        <input
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            placeholder="ej: general, proyectos, etc."
                            autoFocus
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || !channelName.trim()} 
                            className="create-btn"
                        >
                            {loading ? 'Creando...' : 'Crear canal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateChannelModal