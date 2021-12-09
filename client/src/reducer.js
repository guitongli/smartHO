export default function Reducer(state = {}, action) {
    if (action.type == "PUT_USER") {
        state = {
            ...state,
            current_user: action.idToken,
        };
        return state;
    }
    if (action.type == "PUT_CHANNELS") {
        state = {
            ...state,
            channels: action.channels,
        };
        return state;
    }
    if (action.type == "PUT_ROOM_DETAILS") {
        state = {
            ...state,
            room_details: action.room_details,
        };
        return state;
    }
    if (action.type == "PUT_ROOM_MESSAGES") {
        state = {
            ...state,
            room_messages: action.room_messages,
        };
        console.log("updated msg", state.room_messages);

        return state;
    }
  
    return state;
}
