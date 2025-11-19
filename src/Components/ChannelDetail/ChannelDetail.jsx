import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId } from '../../services/messagesService.js'

const ChannelDetail = () => {
    const { channel_id, workspace_id } = useParams() 
    const { response, error, loading, sendRequest } = useFetch()

    async function loadMessagesList() {
        await sendRequest(
            async () => await getMessagesByChannelId(workspace_id, channel_id)
        )
    }

    useEffect(() => {
        if (channel_id && workspace_id) {
            loadMessagesList()
        }
    }, [channel_id, workspace_id])

    if (!channel_id) {
        return (
            <div>
                <span>Canal no seleccionado</span>
            </div>
        )
    }

    console.log(response, error, loading)

    return (
        <div className="channel-detail">
            {loading && <div className="messages-loading">Cargando mensajes...</div>}
            {error && <div className="messages-error">Error: {error}</div>}
            {   
                response && (
                    <div className="messages-container">
                        {
                            response.data?.messages?.map(message => (
                                <div key={message._id}>
                                    <p>{message.content}</p>
                                </div>
                                )
                            )   
                        }
                    </div>
                )
            }
        </div>
    )   
}

export default ChannelDetail