import React, { useState, useEffect } from "react"; 
import ChannelList from "../ChannelList/ChannelList.jsx"; 
import useFetch from "../../hooks/useFetch.jsx";
import { useLocation, useParams, useNavigate } from "react-router"; 
import { getChannelList } from "../../services/channelService.js";
import "./ChannelSidebar.css"
import InviteToWorkspace from "../InviteToWorkspace/InviteToWorkspace.jsx";
import CreateChannelModal from "../CreateChannel/CreateChannelModal.jsx";
import DeleteWorkspace from "../DeleteWorkspace/DeleteWorkspace.jsx";
import EditWorkspaceModal from "../EditWorkspaceModal/EditWorkspaceModal.jsx";
import WorkspaceOptionsMenu from "../WorkspaceOptionsMenu/WorkspaceOptionsMenu.jsx";

const ChannelSidebar = () => {
    const {response, loading, error, sendRequest} = useFetch()
    const location = useLocation()
    const {workspace_id} = useParams()
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false)
    const navigate = useNavigate()
    const [optionsMenu, setOptionsMenu] = useState(
        {
            isOpen: false,
            position: { x: 0, y: 0 },
            workspace: null
        }
    )
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedWorkspace, setSelectedWorkspace] = useState(null)

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

    const handleOptionsClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        
        const workspace = {
            workspace_id: workspace_id,
            workspace_name: location.state?.workspace_name || 'Workspace'
        }
        
        setOptionsMenu({
            isOpen: true,
            position: { x: event.clientX, y: event.clientY },
            workspace: workspace
        })
    }

    const closeOptionsMenu = () => {
        setOptionsMenu({ isOpen: false, position: { x: 0, y: 0 }, workspace: null })
    }

    const handleEditWorkspace = (workspace) => {
        setSelectedWorkspace(workspace)
        setEditModalOpen(true)
    }

    const handleDeleteWorkspace = (workspace) => {
        setSelectedWorkspace(workspace)
        setDeleteModalOpen(true)
    }

    const handleWorkspaceDeleted = () => {
        navigate('/home') 
    }

    const handleWorkspaceUpdated = () => {
        window.location.reload()
    }

    const workspaceName = location.state?.workspace_name || 'Workspace'
    
    return (
        <div className="channel-sidebar">
            <div className="channel-sidebar-header">
                <h3 className="channel-sidebar-title">
                    {workspaceName}
                </h3>
                <button 
                    className="workspace-options-btn"
                    onClick={handleOptionsClick}
                    title="Opciones del workspace"
                >
                    ⋮
                </button>
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

            <WorkspaceOptionsMenu
                isOpen={optionsMenu.isOpen}
                onClose={closeOptionsMenu}
                position={optionsMenu.position}
                workspace={optionsMenu.workspace}
                onEdit={handleEditWorkspace}
                onDelete={handleDeleteWorkspace}
            />
            
            <EditWorkspaceModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                workspace={selectedWorkspace}
                onWorkspaceUpdated={handleWorkspaceUpdated}
            />
            
            <DeleteWorkspace
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                workspace={selectedWorkspace}
                onWorkspaceDeleted={handleWorkspaceDeleted}
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
        </div>
    )
}

export default ChannelSidebar