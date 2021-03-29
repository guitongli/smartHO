export default function Message({ message, timestamp, user, userImage }) {
    console.log('props', message, timestamp, user, userImage );
    return (
        <div className="message">
            <img src={userImage}></img>
            <div className="message__info">
                <p>{user}</p>
                <p>{message}</p>
                {/* <span className='message__time'>{new Date(timestamp?.toDate()).toUTCString}</span> */}
            </div>
        </div>
    );
}
