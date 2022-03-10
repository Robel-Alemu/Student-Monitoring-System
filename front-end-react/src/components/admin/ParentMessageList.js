import BroadcastMessages from './BroadcastMessages';
import SentMessages from './SentMessages';


function ParentMessageList(props) {
    return (
        <ul>
            {props.messages.map(message =>
                <SentMessages
                    id_={message.id}
                    date_ = {message.date}
                    subject_={message.subject}
                    message_={message.message}
                    phone_ = {message.parentPhone}
                    
                />
            )}
        </ul>
    );
}

export default ParentMessageList;