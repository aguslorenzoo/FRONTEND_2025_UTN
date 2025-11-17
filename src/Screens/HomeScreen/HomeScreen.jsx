import React, { useEffect } from "react";
import { getWorkspaces } from "../../services/workspaceService.js";
import useFetch from "../../hooks/useFetch.jsx";
import { Link } from "react-router";
import './HomeScreen.css'

const HomeScreen = () =>{

    const {sendRequest, response, loading, error} = useFetch()

    useEffect(
        () => {
            sendRequest(
                () => getWorkspaces()
            )
        },
        []
    )
    console.log(response, loading, error)
    return (
        <div className="container-home">
            <div className="workspaces-sidebar">
                <div className="title-home">
                    <h1>Espacios de trabajo</h1>  
                </div>
                <div className="workspaces-list">
                    {
                        loading
                        ? <span>Cargando...</span>
                        : 
                        <div className="workspaces-container">
                            {
                            response 
                            &&
                            response.data.workspaces.map(
                                (workspace) => {
                                    return (
                                            <Link to={'/workspace/' + workspace.workspace_id} className="workspace-card">
                                                <div className="workspace-info" key={workspace.workspace_id}>
                                                    {workspace.workspace_url_image && (
                                                        <img 
                                                            src={workspace.workspace_url_image} 
                                                            className="workspace-image"
                                                        />
                                                    )}
                                                    <h2>{workspace.workspace_name}</h2>
                                                </div>
                                            </Link>
                                    )
                                }
                            )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeScreen