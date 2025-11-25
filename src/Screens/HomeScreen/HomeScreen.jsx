import React from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import WorkspaceSidebar from "../../Components/WorkspaceSidebar/WorkspaceSidebar.jsx";
import ChannelDetail from "../../Components/ChannelDetail/ChannelDetail.jsx";
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar.jsx";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const navigate = useNavigate()
    const location = useLocation() 

    const handleBackToChannels = () => {
        navigate(`/workspace/${workspace_id}`);
    }
     
    const channel_name = location.state?.channel_name || 'Canal'

    return ( 
        <div className={`home-screen ${channel_id ? 'has-channel' : 'no-channel'}`}>
            <div className="workspace-sidebar">
                <WorkspaceSidebar />
            </div>
            <div className="channel_sidebar">
                {
                    workspace_id ? (<ChannelSidebar />) : (
                        <div className="workspace-selection-message">
                            <div className="workspace-selection-content">
                                <p>Elige un workspace de la lista para ver sus canales</p>
                            </div>
                        </div>
                    )
                }    
            </div>
            <div className="channel-detail">
                {
                    channel_id ? (
                        <div className="chat-view">
                            <div className="mobile-back-header"
                                style={{
                                    display: 'flex !important',
                                    alignItems: 'center',
                                    position: 'fixed',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    background: '#1a1a1b',
                                    borderBottom: '1px solid #545252',
                                    padding: '12px 16px',
                                    zIndex: 1000,
                                    color: 'white'
                                }}>
                                <button onClick={handleBackToChannels} className="back-button">
                                    ← 
                                </button>
                                <div># {channel_name}</div>
                            </div>
                            <ChannelDetail />
                        </div>
                    ) : (
                        <div className="channel-selection-content">
                            <div className="channel-selection-message">
                                {
                                    workspace_id ? 
                                    (
                                        <div>
                                            <h3>Selecciona un canal</h3>
                                            <p>Elige un canal de la lista para comenzar a chatear</p>
                                        </div>
                                    ) : 
                                    (
                                        <div>
                                            <h3>Bienvenido a Discord Clone</h3>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default HomeScreen