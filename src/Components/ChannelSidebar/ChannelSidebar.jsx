import React, { useEffect } from "react";
import ChannelList from "../ChannelList/ChannelList.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { useParams } from "react-router";
import { getChannelList } from "../../services/channelService.js";

const ChannelSidebar = () => {
    const {response, loading, error, sendRequest} = useFetch()

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

    return (
        <aside>
            <h3>Canales:</h3>
            {
                loading && <span>Cargando...</span>
            }
            {
                response && <ChannelList channel_list={response.data.channels}/>
            }
            {
                error && <span style={{color: 'red'}}>Error al obtener la lista de canales</span>
            }
        </aside>
    )
}

export default ChannelSidebar