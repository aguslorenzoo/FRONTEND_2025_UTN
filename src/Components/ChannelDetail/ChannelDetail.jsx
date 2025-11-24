import React from 'react'
import { useParams } from 'react-router'
import ChannelMessageList from '../ChannelMessageList/ChannelMessageList.jsx'


const ChannelDetail = () => {
    const { channel_id, workspace_id, channel_name } = useParams() 

    if (!channel_id) {
        return (
            <div>
                <span>Canal no seleccionado</span>
            </div>
        )
    }

    return (
        <div className="channel-detail">
            <ChannelMessageList
                workspace_id={workspace_id}
                channel_id={channel_id}
            />
        </div>
    )   
}

export default ChannelDetail