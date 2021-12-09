import React, { useEffect, useState } from "react";
import FiberManualRecording from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import SidebarOption from "./sidebar-option";
import InboxIcon from "@material-ui/icons/Inbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import db from "./firebase";
import { putChannels } from "./actions";
import { useSelector, useDispatch } from "react-redux";

export default function Sidebar() {
    const dispatch = useDispatch();
    const term= useSelector((state) => {
        return state.term;
    });
    const region = useSelector((state) => {
        return state.region;
    });
    useEffect(() => {
        db.collection("rooms").onSnapshot((snapshot) => {
            dispatch(
                putChannels(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                    }))
                )
            );
        });
    }, []);
    return (
        <div className="sidebar">
             
           
            {channels &&
                channels.map((channel) => {
                    return (
                        <SidebarOption
                            title={channel.name}
                            key={channel.id}
                            id={channel.id}
                        />
                    );
                })}
   
        </div>
    );
}
