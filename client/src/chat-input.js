import Button from "@material-ui/core/Button";
import db from "./firebase";
import firebase from "firebase";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ChatInput({ channelName, channelId }) {
    const user = useSelector((state) => {
        return state.current_user;
    });
    const [input, setInput] = useState("");
    const sendMessage = (e) => {

        e.preventDefault();
        if (channelId) {
            db.collection("rooms").doc(channelId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            }).then(result=> console.log(result)).catch(err=> console.log(err));
        };
        setInput(null);
    };
    return (
        <div className="chat-input">
            <form>
                <input
                    placeholder={channelName?.toLowerCase()}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <Button type="summit" onClick={sendMessage}>
                    Send
                </Button>
            </form>
        </div>
    );
}
