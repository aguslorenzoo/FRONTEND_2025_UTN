import React from "react";
import { useParams } from "react-router";
import WorkspaceSidebar from "../../Components/WorkspaceSidebar/WorkspaceSidebar.jsx";
import ChannelDetail from "../../Components/ChannelDetail/ChannelDetail.jsx";
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar.jsx";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { workspace_id, channel_id } = useParams();
    
    return ( 
        <div className="home-screen">
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
                    channel_id ? (<ChannelDetail />) : (
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