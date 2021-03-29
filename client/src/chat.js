import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "./firebase";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Message from "./message";
import ChatInput from './chat-input';
import { useSelector, useDispatch } from "react-redux";
import { putRoomDetails, putRoomMessages } from "./actions";


export default function Chat() {
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const roomDetails = useSelector((state) => {
        return state.room_details;
    });
    const roomMessages = useSelector((state) => {
        return state.room_messages;
    });
    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    dispatch(putRoomDetails(snapshot.data()));
                });

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    dispatch(
                        putRoomMessages(
                            snapshot.docs.map((doc) => {
                                return doc.data();
                            })
                        )
                    );
                });
        }
    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__left">
                    <h4 className="chat__channel-name">
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className="chat__header__right">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>
            <div className="chat__messages">
                {roomMessages &&
                    roomMessages.map(
                        ({ message, timestamp, user, userImage}) => {
                            return (
                                <Message
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                    key = {timestamp}
                                />
                            );
                        }
                    )}
            </div>
            <ChatInput channelName={roomDetails?.name} channelId ={roomId}/>
        </div>
    );
}
