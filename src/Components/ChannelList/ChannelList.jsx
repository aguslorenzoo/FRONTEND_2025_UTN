import React, { useState } from "react";
import { Link, useParams } from "react-router";
import "./ChannelList.css" 
import DeleteChannel from "../DeleteChannel/DeleteChannel";
 
const ChannelList = ({channel_list, onChannelDeleted}) => {
    const {workspace_id} = useParams()
    const [isDeleteChannelOpen, setIsDeleteChannelOpen] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    
    const handleDeleteClick = (e, channel) => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedChannel(channel);
        setIsDeleteChannelOpen(true);
    }

    const handleChannelDeleted = () => {
        setIsDeleteChannelOpen(false)
        setSelectedChannel(null)
        if (onChannelDeleted) {
            onChannelDeleted()
        }
    }
    return (
        <div className="channelList-container">
            {
                channel_list.length === 0
                ? <span>Aun no tienes ningun canal</span>
                : channel_list.map(
                    (channel) => {
                        return (
                            <div className="channel-container" key={channel._id} >
                                <Link 
                                    className="channel-link" 
                                    key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}
                                    state={{ channel_name: channel.name }}
                                >
                                    <div className="channel-card">
                                        <div className="channel-title">
                                            {channel.name}
                                        </div>
                                        <button 
                                            className="delete-channel-btn"
                                            onClick={(e) => handleDeleteClick(e, channel)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                )
            }
            <DeleteChannel
                isOpen={isDeleteChannelOpen}
                onClose={
                    () => {
                        setIsDeleteChannelOpen(false)
                        setSelectedChannel(null)
                    }
                }
                channel={selectedChannel}
                workspace_id={workspace_id}
                onChannelDeleted={handleChannelDeleted}
            />
        </div>
    )
}

export default ChannelList