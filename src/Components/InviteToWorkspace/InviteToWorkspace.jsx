import React, { useState } from 'react';
import { inviteToWorkspace } from '../../services/workspaceService.js';
import "./InviteToWorkspace.css"

const InviteToWorkspace = ({ isOpen, onClose, workspace_id, workspace_name }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return
        
        setLoading(true)
        setError('')
        
        try {
            console.log('Enviando invitación a:', email, 'workspace:', workspace_id)
            await inviteToWorkspace(workspace_id, email)
            setEmail('')
            onClose()
        } catch (err) {
            setError(err.message)
            console.error('Error invitando:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Invitar a {workspace_name}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@ejemplo.com"
                            required
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="create-btn">
                            {loading ? 'Enviando...' : 'Invitar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InviteToWorkspace