import React from "react";
import { useHistory } from "react-router-dom";
import db from './firebase';

export default function SidebarOption({ Icon, title, id, addChannelOption }) {
    const history = useHistory();
    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`);
        } else {
            history.push(title);
        }
    };

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            db.collection("rooms").add({
                name: channelName,
            });
        }
    };
    return (
        <div
            className="sidebar-option"
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon className="sidebar-option__icon" />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <h3 className="sidebar-option__channel">
                    <span className="sidebar-option__hash"># {title}</span>
                </h3>
            )}
        </div>
    );
}
