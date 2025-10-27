import React, { useEffect } from "react";
import { getWorkspaces } from "../../services/workspaceService.js";
import useFetch from "../../hooks/useFetch.jsx";

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
            
        </div>
    )
}

export default HomeScreen