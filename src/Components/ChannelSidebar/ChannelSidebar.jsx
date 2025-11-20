import React, { useState ,useEffect } from "react"; 
import ChannelList from "../ChannelList/ChannelList.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { useLocation, useParams } from "react-router";
import { getChannelList } from "../../services/channelService.js";
import "./ChannelSidebar.css"
import InviteToWorkspace from "../InviteToWorkspace/InviteToWorkspace.jsx";
import CreateChannelModal from "../CreateChannel/CreateChannelModal.jsx";

const ChannelSidebar = () => {
    const {response, loading, error, sendRequest} = useFetch()
    const location = useLocation()
    const {workspace_id} = useParams()
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false)

    async function loadChannelList (){
        await sendRequest(
            async () => await getChannelList(workspace_id)
        )
    }

    useEffect(
        () => {
            loadChannelList()
        },
        [workspace_id]
    )

    console.log(response, error, loading)

    const workspaceName = location.state?.workspace_name || 'Workspace';
    
    return (
        <aside className="channel-sidebar">
            <div className="channel-sidebar-header">
                <h3 className="channel-sidebar-title">
                    {workspaceName}
                </h3>
            </div>
            <div className="title-separator" />
            <div className="invite-button-contianer">
                <button className="invite-button" onClick={() => setIsInviteModalOpen(true)}>
                    Invitar
                </button>   
            </div>
            <InviteToWorkspace 
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                workspace_id={workspace_id}
                workspace_name={workspaceName}
            />

            <CreateChannelModal
                isOpen={isCreateChannelModalOpen}
                onClose={() => setIsCreateChannelModalOpen(false)}
                workspace_id={workspace_id}
                onChannelCreated={loadChannelList}
            />

            <div className="channel-sidebar-content">
                <div className="channel-header">
                    <h4 className="channel-category-title">CANALES</h4>
                    <div className="create-channel-button-container">
                        <button className="create-channel-btn" onClick={() => setIsCreateChannelModalOpen(true)}>
                            + 
                        </button>
                    </div>
                </div>
                <div className="channel-separator"/>
                {loading && <span className="channel-loading">Cargando...</span>}
                {response && <ChannelList channel_list={response.data.channels}/>}
                {error && <span className="channel-error">Error al obtener canales</span>}
            </div>
        </aside>
    )
}

export default ChannelSidebar