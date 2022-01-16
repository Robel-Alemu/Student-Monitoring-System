import BroadcastMessages from './BroadcastMessages';


function MessageList(props) {
    return (
        <ul>
            {props.messages.map(message =>
                <BroadcastMessages
                    id_={message.id}
                    datePosted={message.datePosted}
                    message_={message.message}
                    
                />
            )}
        </ul>
    );
}

export default MessageList;