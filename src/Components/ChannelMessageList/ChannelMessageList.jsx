import React, { useState, useEffect, useContext } from 'react'
import { getMessagesByChannelId, sendMessage } from '../../services/messagesService.js'
import './ChannelMessageList.css'
import { useLocation } from 'react-router' 
import { getCurrentMemberId } from '../../services/memberService.js'
import 'bootstrap-icons/font/bootstrap-icons.css'; 


const ChannelMessageList = ({ workspace_id, channel_id }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const location = useLocation() 
    const [currentMemberId, setCurrentMemberId] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)

    const loadMessages = async () => {
        try {
            setLoading(true);
            const response = await getMessagesByChannelId(workspace_id, channel_id)
            

            if (response.ok) {
                setMessages(response.data.messages || []);
            }
        }catch(err) {
            console.error('No se pudieron cargar los mensajes');
        }finally {
            setLoading(false);
        }
    }
    
    const loadCurrentMemberId = async () => {
        try {
            if (workspace_id) {
                const memberId = await getCurrentMemberId(workspace_id);
                setCurrentMemberId(memberId);
            }
        } catch (err) {
            console.error('Error obteniendo member_id:', err);
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        
        if (!newMessage.trim() || sending) return;
        
        try {
            setSending(true)
            const response = await sendMessage(workspace_id, channel_id, newMessage.trim());
            
            if (response && response.ok) {
                await loadMessages()
                setNewMessage('')
            }
        } 
        catch (err) {
            setError('Error al enviar el mensaje');
        } finally {
            setSending(false);
        }
    }


    useEffect(
        () => {
            if (workspace_id && channel_id) {
                loadCurrentMemberId();
                loadMessages();
            }
        }, 
        [workspace_id, channel_id]
    )



    if (!channel_id) {
        return (
            <div className="pre-message">
                <p>Selecciona un canal</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="pre-message">
                <p>Cargando mensajes...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="pre-message">
                <p>{error}</p>
                <button onClick={loadMessages}>Reintentar</button>
            </div>
        )
    }

    const channel_name = location.state?.channel_name || 'Canal'

    return (
        <div className="message-container">
            <div className='chat-title'>
                <h3># {channel_name}</h3>
            </div>
            <div className="chat-separator"/>
            <div className="message-list">
                {
                    messages.length === 0 ? (
                        <p>Todavía no hay mensajes en este canal</p>
                    ) : (
                        messages.map(message => {
                            const isOwnMessage = currentMemberId === message.member_id;
                            
                            return (
                                <div 
                                    key={message._id} 
                                    className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
                                >
                                    {!isOwnMessage && <strong>{message.user_name}:</strong>}
                                    <p>{message.message_content}</p>
                                    <small>{new Date(message.created_at).toLocaleString()}</small>
                                </div>
                            )
                        })
                    )
                } 
            </div>
            <div>
                <form onSubmit={handleSendMessage}>
                    <div className="chat-form">
                        <label className='chat-label' htmlFor="message"></label>
                        <input 
                            className="chat-input" 
                            type="text" 
                            placeholder="Escribe un mensaje..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={sending}
                        />
                        <button 
                            type="submit" 
                            className="send-button"
                            disabled={sending || !newMessage.trim()}
                        >
                            <i className="bi bi-send"></i>    
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChannelMessageList