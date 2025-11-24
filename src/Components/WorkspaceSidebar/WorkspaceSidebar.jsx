import React, { useState ,useEffect } from "react"; 
import { useParams, Link } from "react-router";
import useFetch from "../../hooks/useFetch.jsx"; 
import { getWorkspaces } from "../../services/workspaceService.js";
import "./WorkspaceSidebar.css"
import CreateWorkspace from "../CreateWorkspace/CreateWorkspace.jsx";

const WorkspaceSidebar = () => { 
    const { workspace_id } = useParams();
    const { response, error, loading, sendRequest } = useFetch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function loadWorkspaceList() {
        await sendRequest(
            async () => await getWorkspaces()
        )
    }

    useEffect(
            () => {
            loadWorkspaceList()
        },
        []
    )

    const handleCreateWorkspace = () => {
        setIsModalOpen(true) 
    }

    const handleWorkspaceCreated = () => {
        loadWorkspaceList()
    };


    console.log(response, error, loading)
    return (
        <div className="workspace-sidebar">
            {
                response?.data?.workspaces?.map(workspace => (
                    <div key={workspace.workspace_id} className="workspace-item">
                        <Link 
                            to={`/workspace/${workspace.workspace_id}`}
                            className={`workspace-link ${workspace_id === workspace.workspace_id ? 'active': ''}`}
                            state={{ workspace_name: workspace.workspace_name }}
                        >
                        {workspace.workspace_url_image ? (
                            <img 
                                src={workspace.workspace_url_image} 
                                alt={workspace.workspace_name}
                                className="workspace-image"
                            />
                        ) : (
                            <span className="workspace-initial">
                                {workspace.workspace_name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </Link>
                    <div className="workspace-efect">
                        {workspace.workspace_name}
                    </div>
                </div>
                ))
            }
            <div className="workspace-separator" />
            <button className="create-workspace-btn"
                onClick={handleCreateWorkspace} >
                +
            </button>
            <CreateWorkspace
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onWorkspaceCreated={handleWorkspaceCreated}
            />

            {loading && <span className="loading-text">Cargando...</span>}
            {error && <span className="error-text">Error</span>}
        </div>
    )
}

export default WorkspaceSidebar