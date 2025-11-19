import React from "react";
import { Link, useParams } from "react-router";
import "./ChannelList.css"

const ChannelList = ({channel_list}) => {
    const {workspace_id} = useParams()
    return (
        <div className="channelList-container">
            {
                channel_list.length === 0
                ? <span>Aun no tienes ningun canal</span>
                : channel_list.map(
                    (channel) => {
                        return (
                            <Link className="channel-card" key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>
                                <div className="channel-title">
                                    {channel.name}
                                </div>
                            </Link>
                        )
                    }
                )
            }
        </div>
    )
}

export default ChannelList