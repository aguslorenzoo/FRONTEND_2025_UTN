import React, { useEffect } from "react";
import ChannelList from "../ChannelList/ChannelList.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { useLocation, useParams } from "react-router";
import { getChannelList } from "../../services/channelService.js";
import "./ChannelSidebar.css"

const ChannelSidebar = () => {
    const {response, loading, error, sendRequest} = useFetch()
    const location = useLocation()
    const {workspace_id} = useParams()

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
            <div className="channel-sidebar-content">
                <h4 className="channel-category-title">CANALES</h4>
                <div className="channel-separator"/>
                {loading && <span className="channel-loading">Cargando...</span>}
                {response && <ChannelList channel_list={response.data.channels}/>}
                {error && <span className="channel-error">Error al obtener canales</span>}
            </div>
        </aside>
    )
}

export default ChannelSidebar