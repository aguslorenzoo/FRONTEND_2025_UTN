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
        <div>
            <h1>Lista de espacios de trabajo</h1>
            {
                loading
                ? <span>Cargando...</span>
                : <div>
                    {
                    response 
                    &&
                    response.data.workspaces.map(
                        (workspace) => {
                            return (
                                <div key={workspace.workspace_id}>
                                    <h2>{workspace.workspace_name}</h2>
                                    <Link to={'/workspace/' + workspace.workspace_id}>Abrir workspace</Link>
                                </div>
                            )
                        }
                    )
                    }
                </div>
            }
        </div>
    )
}

export default HomeScreen