import React, { ReactElement } from 'react';
import './ChatMessage.css';

interface Props {
  received: boolean;
  name: string;
  message: string;
  timestamp: string;
}

function ChatMessage({ received, name, message, timestamp }: Props): ReactElement {
  return (
    <p className={received ? 'chat__message chat__receiver' : 'chat__message'}>
      <span className='chat__name'>{name}</span>
           {message}
      <span className="chat__timestamp">
        {new Date().toUTCString()}
      </span>
    </p>
  )
}

export default ChatMessage
