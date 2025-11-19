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
            <WorkspaceSidebar />
        
            <div className="channel-sidebar">
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
            
            
            {
                channel_id ? (<ChannelDetail />) : (
                    <div className="channel-selection-message">
                        <div className="channel-selection-content">
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
                                        <p>Selecciona un workspace para comenzar</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HomeScreen;